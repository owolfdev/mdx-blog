const { exec } = require("child_process");

export function openInVSCode(data) {
  console.log("data from open in vs code:", data.frontMatter.path);

  const path = data.frontMatter.path;
  const filePath = `data/posts/${path}`;

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
