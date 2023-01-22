import ip from 'ip';

import fs from 'fs';
import path from 'path';

const host = ip.address();

function writeContentEnvFile(variable: string, local: string): void {
  try {
    const contentEnv = `${variable}="${host}"`;
    fs.writeFileSync(local, contentEnv, 'utf8');
  } catch (e) {
    console.error(e);
  }
}

const webPath = path.join(__dirname, '/../../../web/.env');
const mobilePath = path.join(__dirname, '/../../../mobile/.env');

writeContentEnvFile('VITE_SERVER_ADDRESS', webPath);
writeContentEnvFile('SERVER_ADDRESS', mobilePath);

export default host;
