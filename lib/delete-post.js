const { exec } = require("child_process");
// import generatePostsCache from "./posts-utils.mjs";

export function deleteLocalFile(data) {
  console.log("data from delete function:", data.frontMatter.path);

  const path = data.frontMatter.path;
  const filePath = `data/posts/${path}`;

  console.log("filePath to delete:", filePath);

  exec(`rm "${filePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    } else {
      console.log("file deleted");
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    // Update the posts cache after file deletion
  });
}
