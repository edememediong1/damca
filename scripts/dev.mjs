import { createServer } from 'vite';
import { spawn } from 'node:child_process';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const api = spawn(process.execPath, ['--import', 'tsx', 'server.ts'], { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development' } });
const vite = await createServer({ configFile: false, plugins: [react(), tailwindcss()], server: { port: 3000, host: '0.0.0.0', proxy: { '/api': 'http://localhost:8787' } } });
await vite.listen();
vite.printUrls();
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { api.kill(signal); await vite.close(); process.exit(); });
