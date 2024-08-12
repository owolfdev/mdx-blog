const fs = require("fs");
const path = require("path");

const oldPostsDir = path.join(__dirname, "../../content/posts_old");
const newPostsDir = path.join(__dirname, "../../content/posts");

const getFiles = (dir) => {
  return fs.readdirSync(dir).sort(); // Get files in alphabetical order
};

const compareDirectories = () => {
  const oldFiles = getFiles(oldPostsDir);
  const newFiles = getFiles(newPostsDir);

  const oldFileCount = oldFiles.length;
  const newFileCount = newFiles.length;

  if (oldFileCount === newFileCount) {
    console.log("Both directories have the same number of files.");
  } else if (oldFileCount > newFileCount) {
    console.log(
      `The "posts_old" directory has ${
        oldFileCount - newFileCount
      } more files than the "posts" directory.`
    );
  } else {
    console.log(
      `The "posts" directory has ${
        newFileCount - oldFileCount
      } more files than the "posts_old" directory.`
    );
  }

  // List files that are in one directory but not the other
  const filesOnlyInOld = oldFiles.filter((file) => !newFiles.includes(file));
  const filesOnlyInNew = newFiles.filter((file) => !oldFiles.includes(file));

  if (filesOnlyInOld.length > 0) {
    console.log('Files only in "posts_old":');
    console.log(filesOnlyInOld.join("\n"));
  }

  if (filesOnlyInNew.length > 0) {
    console.log('Files only in "posts":');
    console.log(filesOnlyInNew.join("\n"));
  }

  if (filesOnlyInOld.length === 0 && filesOnlyInNew.length === 0) {
    console.log("All files are present in both directories.");
  }
};

compareDirectories();
