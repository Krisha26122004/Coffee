import { spawn } from "node:child_process";

const commands = [
  ["backend", "node", ["backend/server.js"]],
  ["frontend", "node", ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1"]],
];

const children = commands.map(([name, command, args]) => {
  const child = spawn(command, args, {
    cwd: process.cwd(),
    shell: true,
    stdio: ["inherit", "pipe", "pipe"],
  });

  child.stdout.on("data", (data) => process.stdout.write(`[${name}] ${data}`));
  child.stderr.on("data", (data) => process.stderr.write(`[${name}] ${data}`));
  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
    }
  });

  return child;
});

const stopAll = () => {
  children.forEach((child) => child.kill());
  process.exit();
};

process.on("SIGINT", stopAll);
process.on("SIGTERM", stopAll);
