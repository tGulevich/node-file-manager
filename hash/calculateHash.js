import path from "node:path";
import {createReadStream}from "node:fs";
import { cwd } from "node:process";
import { createHash } from 'crypto';

export async function calculateHash(filePath) {
  try {
    const resolvedFilePath = path.isAbsolute(filePath) ? filePath : path.resolve(cwd(), filePath);
    
    const hash = createHash('sha256');
    const stream = createReadStream(resolvedFilePath);

    stream.on('data', (chunk) => {
      hash.update(chunk);
    });

    stream.on('end', () => {
      const hashValue = hash.digest('hex');
      console.log(`Hash of file '${resolvedFilePath}': ${hashValue}`);
    });

    stream.on('error', (err) => {
      console.error(`Error reading file: ${err.message}`);
    });
  } catch (err) {
    console.error(`Error calculating hash: ${err.message}`);
  }
}