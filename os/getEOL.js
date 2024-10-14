import {EOL} from 'node:os';

export function getEOL() {
  const eol = JSON.stringify(EOL);
  console.log(`Default system End-Of-Line (EOL): ${eol}`);
}
