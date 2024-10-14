import path from "node:path";
import { cwd } from "node:process";
import { mkdir } from "node:fs/promises"; 
import {createReadStream, createWriteStream}from "node:fs";

export const cpAction = async (sourceFilePath, destinationDirectory) => {
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

    writeStream.on('finish', () => {
      console.log(`File copied to '${destinationFilePath}' successfully.`);
    });

  } catch (err) {
    console.error('Error during file copy:', err.message);
  }

};