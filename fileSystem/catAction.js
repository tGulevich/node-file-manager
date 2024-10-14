import path from "node:path";
import { cwd } from "node:process";
import fs from "node:fs";

function readFileContent(filePath) {
  const resolvedPath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(cwd(), filePath);

  const readStream = fs.createReadStream(resolvedPath, "utf-8");

  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on("end", () => {
    console.log("\n--- End of file ---");
  });

  readStream.on("error", (err) => {
    console.error("Error reading file:", err.message);
  });
}


export const catAction = async (targetPath) => {
      if (!targetPath) {
        console.error("Invalid input: Path argument is missing.");
      } else {
        readFileContent(targetPath);
      }

};