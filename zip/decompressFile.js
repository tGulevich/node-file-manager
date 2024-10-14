import path from "node:path";
import {createReadStream, createWriteStream}from "node:fs";
import { access, mkdir } from "node:fs/promises"; // Import fs module for filesystem operations
import { createBrotliDecompress } from 'node:zlib';

export const decompressFile = async (inputPath, outputPath) => {
    const fileName = `${inputPath}`.slice(inputPath.lastIndexOf('/') + 1, inputPath.lastIndexOf('.'));
      const resolvedInputPath = path.isAbsolute(inputPath) ? inputPath : path.resolve(process.cwd(), inputPath);
  const resolvedOutputPath = path.isAbsolute(outputPath) ? outputPath : path.resolve(process.cwd(), outputPath);

      try {
    await access(resolvedInputPath);
    console.log(`File exists: ${resolvedInputPath}`);
  } catch (error) {
    console.error(`File does not exist: ${resolvedInputPath}`);
    return;
  }

    await mkdir(resolvedOutputPath, { recursive: true });

    const targetPath = path.join(resolvedOutputPath, `${fileName}.txt`);
    const compressStream = createBrotliDecompress();
    const inputStream = createReadStream(resolvedInputPath);
    const outputStream = createWriteStream(targetPath)

    inputStream.pipe(compressStream).pipe(outputStream);

    inputStream.on('error', (err) => console.error(err));
    outputStream.on('error', (err) => console.error(err));
}

