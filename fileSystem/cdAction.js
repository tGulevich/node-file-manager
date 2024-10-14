import path from "node:path";
import { cwd, chdir } from "node:process";

export const cdAction = async (targetPath) => {
          if (!targetPath) {
        console.error("Invalid input: Path argument is missing.");
      } else {
        try {
          const newPath = path.resolve(cwd(), targetPath);
          const rootPath = path.parse(newPath).root;

          if (newPath.startsWith(rootPath)) {
            chdir(newPath);
            console.log(`Changed directory to ${newPath}`);
          } else {
            console.error("Invalid input: Cannot go above the root directory.");
          }
        } catch (err) {
          console.error(
            "Invalid input: Unable to change directory. Error:",
            err.message
          );
        }
      }
};