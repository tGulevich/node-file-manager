import path from "node:path";
import { cwd } from "node:process";
import { unlink } from "node:fs/promises";

export const rmAction = async (filePath) => {
  try {
    const resolvedFilePath = path.isAbsolute(filePath) ? filePath : path.resolve(cwd(), filePath);

    await unlink(resolvedFilePath);
    console.log(`File '${resolvedFilePath}' deleted successfully.`);
  } catch (err) {
    console.error(`Error deleting file: ${err.message}`);
  }
};