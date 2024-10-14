import readline from "node:readline";
import { cwd, chdir } from "node:process";
import { homedir } from "node:os";
import path from "node:path"; // Import path module for directory handling
import fs from "node:fs"; // Import fs module for filesystem operations

const getUsername = () => {
  const args = process.argv.slice(2); // Get arguments after "npm run start --"

  const usernameArg = args.find((arg) => arg.startsWith("--username="));
  if (usernameArg) {
    return usernameArg.split("=")[1];
  }
  return null;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "==> ",
});

// Listen for Ctrl+C (SIGINT)
rl.on("SIGINT", () => {
  exitProgram();
});

function exitProgram() {
  const username = getUsername();

  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0); // Exit the program
}

// Function to list files and folders in the current directory as a table
function listDirectoryContents() {
  const currentPath = cwd();

  // Read the contents of the directory
  fs.readdir(currentPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log("Unable to read directory. Error:", err.message);
      return;
    }

    // Prepare the data for console.table
    const tableData = [];

    for (const file of files) {
      if (file.isDirectory()) {
        tableData.push({ Name: file.name, Type: "directory" });
      } else {
        tableData.push({ Name: file.name, Type: "file" });
      }
    }

    // Sort the table data: folders first, then files
    tableData.sort((a, b) => {
      if (a.Type === "directory" && b.Type === "file") return -1; // Folders come first
      if (a.Type === "file" && b.Type === "directory") return 1; // Files come last
      return a.Name.localeCompare(b.Name); // Sort alphabetically
    });

    // Print the table
    console.log("\nDirectory contents:");
    console.table(tableData);
  });
}

// // Function to read and print the contents of a file using a readable stream
// function readFileContent(filePath) {
//   // МНЕ НЕ НРАВИТСЯ ЧТО НАДО ПРОПИСЫАТЬ ПОЛНЫЙ ПУТЬ К ФАЙЛУ
//   const resolvedPath = path.resolve(cwd(), filePath);

//   const readStream = fs.createReadStream(resolvedPath, "utf-8");

//   readStream.on("data", (chunk) => {
//     process.stdout.write(chunk);
//   });

//   readStream.on("end", () => {
//     console.log("\n--- End of file ---");
//   });

//   readStream.on("error", (err) => {
//     console.log("Error reading file:", err.message);
//   });
// }

// Function to read and print the contents of a file using a readable stream
function readFileContent(filePath) {
  // Check if the path is absolute; if not, resolve it relative to the current directory
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
    console.log("Error reading file:", err.message);
  });
}

const lineController = (inputText) => {
  const command = inputText.trim().split(" ")[0];
  const targetPath = inputText.trim().split(" ")[1];
  console.log("🚀 ~ lineController ~ command:", command);
  switch (command) {
    case ".exit":
      exitProgram();
      break;
    case "up":
      // Move to the parent directory
      const currentPath = cwd();
      const parentPath = path.dirname(currentPath); // Get the parent directory
      const rootPath = path.parse(currentPath).root;

      // Check if the current directory is already the root
      if (currentPath === rootPath) {
        console.log("Invalid input: You are already at the root directory.");
      } else {
        chdir(parentPath); // Change to the parent directory
        console.log(`Changed directory to ${parentPath}`);
      }
      break;
    case "cd":
      if (!targetPath) {
        console.log("Invalid input: Path argument is missing.");
      } else {
        try {
          const newPath = path.resolve(cwd(), targetPath); // Resolve relative paths to absolute paths
          const rootPath = path.parse(newPath).root;

          // Ensure we don't go above the root directory
          if (newPath.startsWith(rootPath)) {
            chdir(newPath); // Change directory if valid
            console.log(`Changed directory to ${newPath}`);
          } else {
            console.log("Invalid input: Cannot go above the root directory.");
          }
        } catch (err) {
          console.log(
            "Invalid input: Unable to change directory. Error:",
            err.message
          );
        }
      }
      break;
    case "ls":
      listDirectoryContents();
      break;
    case "cat":
      if (!targetPath) {
        console.log("Invalid input: Path argument is missing.");
      } else {
        readFileContent(targetPath);
      }
      break;
    default:
      printWarningLog();
      break;
  }
};

const printCurrentDirectory = () => {
  console.log(`You are currently in ${cwd()}`);
};

const printWarningLog = () => {
  console.log("Invalid input");
};

const printFailLog = () => {
  console.log("Operation failed");
};

const greetUser = () => {
  const username = getUsername();

  if (username) {
    console.log(`Welcome to the File Manager, ${username}!`);
    rl.on("line", lineController);
    chdir(homedir());
    printCurrentDirectory();
  } else {
    console.log("Hello! Please provide a username using --username.");
  }
};

greetUser();
