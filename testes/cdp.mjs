// Mini-cliente do Chrome DevTools Protocol (sem dependências)
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Caminho do Chrome: use a variável CHROME se ele estiver em outro lugar
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function abrir({ porta = 9333 } = {}) {
  const perfil = mkdtempSync(join(tmpdir(), 'cdp-'));
  const proc = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${porta}`, `--user-data-dir=${perfil}`,
    '--no-first-run', '--no-default-browser-check', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
  let alvos;
  for (let i = 0; i < 50; i++) {
    try { alvos = await (await fetch(`http://127.0.0.1:${porta}/json`)).json(); if (alvos.find(t => t.type === 'page')) break; } catch {}
    await sleep(200);
  }
  const pagina = alvos.find(t => t.type === 'page');
  const ws = new WebSocket(pagina.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0; const pend = new Map(); const ouvintes = [];
  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pend.has(m.id)) { const { ok, err } = pend.get(m.id); pend.delete(m.id); m.error ? err(new Error(JSON.stringify(m.error))) : ok(m.result); }
    else ouvintes.forEach((f) => f(m));
  });
  const enviar = (method, params = {}) => new Promise((ok, err) => { const i = ++id; pend.set(i, { ok, err }); ws.send(JSON.stringify({ id: i, method, params })); });
  const erros = [];
  ouvintes.push((m) => {
    if (m.method === 'Runtime.exceptionThrown') erros.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    if (m.method === 'Runtime.consoleAPICalled' && (m.params.type === 'error' || m.params.type === 'warning')) erros.push('console.' + m.params.type + ': ' + m.params.args.map(a => a.value ?? a.description).join(' '));
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error' && !/fonts\.g/.test(m.params.entry.url || '')) erros.push('log: ' + m.params.entry.text + ' ' + (m.params.entry.url || ''));
  });
  await enviar('Runtime.enable'); await enviar('Log.enable'); await enviar('Page.enable');
  const avaliar = async (expr) => {
    const r = await enviar('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error('avaliar: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
    return r.result.value;
  };
  const foto = async (arquivo) => { const r = await enviar('Page.captureScreenshot', { format: 'png' }); writeFileSync(arquivo, Buffer.from(r.data, 'base64')); };
  const tela = async ({ w, h, dpr = 1, celular = false }) => {
    await enviar('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dpr, mobile: celular });
    await enviar('Emulation.setFocusEmulationEnabled', { enabled: true });
    if (celular) await enviar('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  };
  const ir = async (url) => { await enviar('Page.navigate', { url }); await sleep(1500); };
  const fechar = () => { try { ws.close(); } catch {} proc.kill(); };
  return { enviar, avaliar, foto, tela, ir, fechar, erros };
}
