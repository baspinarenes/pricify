import path from "path";
import fs, { fstat } from "fs";
import { exec } from "child_process";
import Big from "big.js";

const playgroundName = process.argv[2];

if (!playgroundName) {
  console.error("Please give a playground name.");
  process.exit(1);
}

const playgroundPath = path.join(
  __dirname,
  playgroundName.endsWith(".ts")
    ? playgroundName
    : fs.existsSync(path.join(__dirname, playgroundName)) &&
      fs.lstatSync(path.join(__dirname, playgroundName)).isDirectory()
    ? `${playgroundName}/index.ts`
    : `${playgroundName}.ts`
);

exec(`vite-node ${playgroundPath}`, (error, stdout, stderr) => {
  if (error) console.error(`Error: ${error.message}`);
  else if (stderr) console.error(`Error: ${stderr}`);
  console.log(stdout);
});
