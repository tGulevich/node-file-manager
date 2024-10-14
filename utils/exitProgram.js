import { getUsername } from "./getUsername.js";

export const exitProgram = () => {
  const username = getUsername();

  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}
