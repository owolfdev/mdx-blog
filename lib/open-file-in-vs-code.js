const { exec } = require("child_process");

export function openInVSCode(data) {
  console.log("data from open in vs code:", data);

  const path = data;
  const filePath = `${path}`;

  console.log("filePath:", filePath);

  exec(`code "${filePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}
