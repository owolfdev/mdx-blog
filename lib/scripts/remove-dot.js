const fs = require("node:fs");
const path = require("node:path");

const oldPostsDir = path.join(__dirname, "../../content/posts_old");
const newPostsDir = path.join(__dirname, "../../content/posts");

const getDotFiles = (dir) => {
  return fs.readdirSync(dir).filter((file) => file.startsWith("."));
};

const removeDotFiles = (dir) => {
  const dotFiles = getDotFiles(dir);

  // biome-ignore lint/complexity/noForEach: <explanation>
  dotFiles.forEach((file) => {
    const filePath = path.join(dir, file);
    fs.unlinkSync(filePath);
    console.log(`Removed: ${filePath}`);
  });

  if (dotFiles.length === 0) {
    console.log(`No dot files found in ${dir}`);
  }
};

const removeDotFilesInDirs = () => {
  removeDotFiles(oldPostsDir);
  removeDotFiles(newPostsDir);
};

removeDotFilesInDirs();
