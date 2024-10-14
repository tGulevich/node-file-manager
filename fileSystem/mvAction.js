import path from "node:path";
import { cwd } from "node:process";
import { mkdir, unlink } from "node:fs/promises"; 
import {createReadStream, createWriteStream}from "node:fs";

export const mvAction = async (sourceFilePath, destinationDirectory) => {
  try {
    const resolvedSourcePath = path.isAbsolute(sourceFilePath) ? sourceFilePath : path.resolve(cwd(), sourceFilePath);
    const resolvedDestinationDir = path.isAbsolute(destinationDirectory) ? destinationDirectory : path.resolve(cwd(), destinationDirectory);

    const fileName = path.basename(resolvedSourcePath);
    const destinationFilePath = path.join(resolvedDestinationDir, fileName);

    await mkdir(resolvedDestinationDir, { recursive: true });

    const readStream = createReadStream(resolvedSourcePath);
    const writeStream = createWriteStream(destinationFilePath);

    readStream.pipe(writeStream);

    readStream.on('error', (err) => {
      console.error('Error reading file:', err.message);
    });

    writeStream.on('error', (err) => {
      console.error('Error writing file:', err.message);
    });

    writeStream.on('finish', async () => {
      console.log(`File moved to '${destinationFilePath}' successfully.`);

      try {
        await unlink(resolvedSourcePath);
        console.log(`Original file '${resolvedSourcePath}' deleted successfully.`);
      } catch (err) {
        console.error(`Error deleting the original file: ${err.message}`);
      }
    });

  } catch (err) {
    console.error('Error during file move:', err.message);
  }

};