import { homedir } from 'node:os';

export function getHomeDirectory() {
  const homeDir = homedir(); // Get the home directory
  console.log(`Home directory: ${homeDir}`);
}