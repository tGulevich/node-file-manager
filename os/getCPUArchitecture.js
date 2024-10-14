import { arch } from 'node:os';

export function getCPUArchitecture() {
  const architecture = arch();
  console.log(`CPU architecture: ${architecture}`);
}