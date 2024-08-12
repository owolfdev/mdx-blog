const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter"); // to parse frontmatter

const oldPostsDir = path.join(__dirname, "../../content/posts_old");
const newPostsDir = path.join(__dirname, "../../content/posts");

const getFiles = (dir) => {
  return fs
    .readdirSync(dir)
    .filter((file) => !file.startsWith(".")) // Filter out files starting with a dot
    .sort(); // Get files in alphabetical order
};

const extractIdFromOldPost = (content) => {
  const parsed = matter(content);
  return parsed.data.id;
};

const extractIdFromNewPost = (content) => {
  const idMatch = content.match(/id:\s*["']([\w-]+)["']/);
  return idMatch ? idMatch[1] : null;
};

const comparePosts = () => {
  const oldFiles = getFiles(oldPostsDir);
  const newFiles = getFiles(newPostsDir);

  if (oldFiles.length !== newFiles.length) {
    console.error("The number of files in the directories do not match.");
    return;
  }

  const idMapping = [];

  for (let i = 0; i < oldFiles.length; i++) {
    const oldFilePath = path.join(oldPostsDir, oldFiles[i]);
    const newFilePath = path.join(newPostsDir, newFiles[i]);

    const oldContent = fs.readFileSync(oldFilePath, "utf-8");
    const newContent = fs.readFileSync(newFilePath, "utf-8");

    const oldId = extractIdFromOldPost(oldContent);
    const newId = extractIdFromNewPost(newContent);

    if (oldId && newId) {
      idMapping.push({
        old_filename: oldFiles[i],
        new_filename: newFiles[i],
        old_id: oldId,
        new_id: newId,
      });
    } else {
      console.error(
        `Failed to extract ID for files: ${oldFiles[i]} and ${newFiles[i]}`
      );
    }
  }

  // Save the result to a JSON file
  fs.writeFileSync(
    path.join(__dirname, "id_mapping.json"),
    JSON.stringify(idMapping, null, 2)
  );

  console.log("ID mapping saved to id_mapping.json");
};

comparePosts();
