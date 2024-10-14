import { calculateHash } from "../hash/calculateHash.js";
import osActions from "../os/index.js";
import fsActions from "../fileSystem/index.js";
import zipActions from "../zip/index.js";

import { exitProgram } from "../utils/exitProgram.js";
import { printWarningLog } from "../utils/printLogs.js";

export const lineController = async (inputText) => {
  const inputTextArray = inputText.trim().split(" ");
  const actionName = inputTextArray[0];
  const firstArg = inputTextArray[1];
  const secondArg = inputTextArray[2];
  const isOsAction = actionName === 'os';

  if (isOsAction) {
    switch (firstArg) {
      case "--EOL":
        osActions.getEOL();
        break;
      case "--cpus":
        osActions.getCPUsInfo();
        break;
      case "--homedir":
        osActions.getHomeDirectory();
        break;
      case "--username":
        osActions.getCurrentUsername();
        break;
      case "--architecture":
        osActions.getCPUArchitecture();
        break;
      default:
        break;
    }
  } else {
    switch (actionName) {
      case ".exit":
        exitProgram();
        break;
      case "up":
        fsActions.upAction();
        break;
      case "cd":
        fsActions.cdAction(firstArg);
        break;
      case "ls":
        fsActions.lsAction();
        break;
      case "cat":
        fsActions.catAction(firstArg);
        break;
      case "add":
        if (!firstArg) {
          console.log('Invalid input: File name is missing.');
        } else {
          await fsActions.addAction(firstArg);
        }
        break;
      case "rn":
        if (!firstArg) {
          console.log('Invalid input: File name is missing.');
        } else if (!secondArg) {
          console.log('Invalid input: New name is missing.');
        } else {
          await fsActions.rnAction(firstArg, secondArg);
        }
        break;
      case "cp":
        if (firstArg && secondArg) {
          fsActions.cpAction(firstArg, secondArg);
        } else {
          console.log('Invalid input: You must provide both the source file path and the destination directory.');
        }
        break;
      case "mv":
        if (firstArg && secondArg) {
          fsActions.mvAction(firstArg, secondArg);
        } else {
          console.log('Invalid input: You must provide both the source file path and the destination directory.');
        }
        break;
      case "rm":
        if (firstArg) {
          fsActions.rmAction(firstArg);
        } else {
          console.log('Invalid input: File path is missing.');
        }
        break;
      case "hash":
        if (firstArg) {
          calculateHash(firstArg);
        } else {
          console.log('Invalid input: File path is missing.');
        }
        break;
      case "compress":
        if (firstArg && secondArg) {
          zipActions.compressFile(firstArg, secondArg);
        } else {
          console.log('Invalid input: Please provide both the source file path and destination path.');
        }
        break;
      case "decompress":
        if (firstArg && secondArg) {
          zipActions.decompressFile(firstArg, secondArg);
        } else {
          console.log('Invalid input: Please provide both the source file path and destination path.');
        }
        break;
      default:
        printWarningLog();
        break;
    }
  }
};
