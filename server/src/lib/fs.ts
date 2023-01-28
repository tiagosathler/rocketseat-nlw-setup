import fs from 'fs';
import path from 'path';

function writeContentEnvFile(key: string, value: string, local: string): void {
  try {
    const contentEnv = `${key}="${value}"`;
    fs.writeFileSync(local, contentEnv, 'utf8');
  } catch (e) {
    console.error(e);
  }
}

export default function createEnvFiles(address: string): void {
  const webPath = path.join(__dirname, '/../../../web/.env');
  const mobilePath = path.join(__dirname, '/../../../mobile/.env');
  writeContentEnvFile('VITE_SERVER_ADDRESS', address, webPath);
  writeContentEnvFile('SERVER_ADDRESS', address, mobilePath);
}
