"use server";

import { exec } from "node:child_process";

export async function openInVSCode(data: string) {
  console.log("data from open in VS Code:", data);

  const filePath = `${data}`;

  console.log("filePath:", filePath);

  exec(
    `code "${filePath}"`,
    (error: Error | null, stdout: string | Buffer, stderr: string | Buffer) => {
      if (error) {
        console.error(`exec error: ${error.message}`);
        return;
      }
      console.log(`stdout: ${stdout.toString()}`);
      console.error(`stderr: ${stderr.toString()}`);
    }
  );
}

export const openInVSCodeAction = async (path: string) => {
  try {
    openInVSCode(path);

    return {
      ok: true,
      status: 200,
      data: "Opened in VS Code",
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: `Failed to open in VS Code: ${(error as Error).message}`,
    };
  }
};

export async function openInCursor(data: string) {
  console.log("data from open in Cursor:", data);

  const filePath = `${data}`;

  console.log("filePath:", filePath);

  exec(
    `cursor "${filePath}"`,
    (error: Error | null, stdout: string | Buffer, stderr: string | Buffer) => {
      if (error) {
        console.error(`exec error: ${error.message}`);
        return;
      }
      console.log(`stdout: ${stdout.toString()}`);
      console.error(`stderr: ${stderr.toString()}`);
    }
  );
}

export const openInCursorAction = async (path: string) => {
  try {
    openInCursor(path);

    return {
      ok: true,
      status: 200,
      data: "Opened in Cursor",
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: `Failed to open in Cursor: ${(error as Error).message}`,
    };
  }
};
