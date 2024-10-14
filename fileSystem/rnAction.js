import path from "node:path";
import { cwd } from "node:process";
import { rename } from "node:fs/promises"; 

export const rnAction = async (oldFilePath, newFileName) => {
  try {
    const resolvedOldPath = path.isAbsolute(oldFilePath) ? oldFilePath : path.resolve(cwd(), oldFilePath);
    const oldPathExtension = oldFilePath.split('.')[1];

    const dir = path.dirname(resolvedOldPath);
    
    const resolvedNewPath = path.resolve(dir, newFileName + (`.${oldPathExtension}` || ''));

    await rename(resolvedOldPath, resolvedNewPath);

    console.log(`File renamed to '${newFileName}' successfully.`);
  } catch (err) {
    console.error('Error renaming file:', err.message);
  }

};