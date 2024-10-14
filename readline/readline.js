import readline from "node:readline";
import { exitProgram } from "../utils/exitProgram.js";
import { lineController } from "./lineController.js";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("SIGINT", () => {
  exitProgram();
});

rl.on("line", lineController);
