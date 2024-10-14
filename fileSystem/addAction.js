import path from "node:path";
import { cwd } from "node:process";
import { writeFile } from "node:fs/promises"; 

export const addAction = async (fileName) => {
  const resolvedPath = path.resolve(cwd(), `${fileName}.txt`);

  try {
    await writeFile(resolvedPath, '', {encoding: 'utf-8', flag: 'wx'});
    console.log(`File '${fileName}' created successfully.`);
  } catch (err) {
    console.error('Error creating file:', err.message);
  }
};