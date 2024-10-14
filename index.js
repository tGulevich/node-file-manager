import { cwd, chdir } from "node:process";
import { homedir } from 'node:os';
import { getUsername } from "./utils/getUsername.js";
import { rl } from "./readline/readline.js";

const startSession = () => {
  const username = getUsername();

  if (username) {
    console.log(`Welcome to the File Manager, ${username}!`);
    chdir(homedir());
    console.log(`You are currently in ${cwd()}`);
  } else {
    console.error("Hello! Please provide a username using --username. EX: npm run start -- --username=Mike888");
    process.exit(0);
  }
}

startSession();



