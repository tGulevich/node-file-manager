import { cwd, chdir } from "node:process";
import path from "node:path";

export const upAction = async () => {
      const currentPath = cwd();
      const parentPath = path.dirname(currentPath);
      const rootPath = path.parse(currentPath).root;

      if (currentPath === rootPath) {
        console.error("Invalid input: You are already at the root directory.");
      } else {
        chdir(parentPath);
        console.log(`Changed directory to ${parentPath}`);
      }
};