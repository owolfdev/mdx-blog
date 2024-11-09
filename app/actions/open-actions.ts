"use server";

const { exec } = require("node:child_process");

export async function openInVSCode(data: string) {
  console.log("data from open in vs code:", data);

  const path = data;
  const filePath = `${path}`;

  console.log("filePath:", filePath);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  exec(`code "${filePath}"`, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
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
      error: "Failed to open in VS Code",
    };
  }
};

export async function openInCursor(data: string) {
  console.log("data from open in vs code:", data);

  const path = data;
  const filePath = `${path}`;

  console.log("filePath:", filePath);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  exec(`cursor "${filePath}"`, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
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
      error: "Failed to open in Cursor",
    };
  }
};
