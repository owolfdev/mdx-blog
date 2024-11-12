"use server";

import { exec } from "node:child_process";

export async function deletePostAction(data: { filename: string }) {
  const path = data.filename;
  const filePath = `content/posts/${path}`;

  console.log("filePath to delete:", filePath);

  try {
    await new Promise<void>((resolve, reject) => {
      exec(`rm "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(error);
        } else {
          console.log("file deleted");
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
          resolve();
        }
      });
    });

    // Update the posts cache after file deletion (optional)
    // await cachePostsAction();

    return {
      ok: true,
      status: 200,
      data: "Post deleted successfully",
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: `Failed to delete post ${error}`,
    };
  }
}
