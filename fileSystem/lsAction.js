import { cwd } from "node:process";
import fs from "node:fs";

export const lsAction = async () => {
      const currentPath = cwd();

  fs.readdir(currentPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error("Unable to read directory. Error:", err.message);
      return;
    }

    const tableData = [];

    for (const file of files) {
      if (file.isDirectory()) {
        tableData.push({ Name: file.name, Type: "directory" });
      } else {
        tableData.push({ Name: file.name, Type: "file" });
      }
    }

    tableData.sort((a, b) => {
      if (a.Type === "directory" && b.Type === "file") return -1;
      if (a.Type === "file" && b.Type === "directory") return 1;
      return a.Name.localeCompare(b.Name);
    });

    console.log("\nDirectory contents:");
    console.table(tableData);
  });
};