import { mkdir, unlink, stat } from "node:fs/promises";
import { join, dirname } from "node:path";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./uploads";

export async function saveFile(
  userId: string,
  fileId: string,
  fileName: string,
  data: ArrayBuffer,
): Promise<string> {
  const relativePath = `${userId}/${fileId}_${fileName}`;
  const fullPath = join(UPLOAD_DIR, relativePath);

  await mkdir(dirname(fullPath), { recursive: true });
  await Bun.write(fullPath, data);

  return relativePath;
}

export async function deleteFile(storagePath: string): Promise<void> {
  const fullPath = join(UPLOAD_DIR, storagePath);
  try {
    await unlink(fullPath);
  } catch {
    // Ignore if file doesn't exist
  }
}

export async function getFilePath(storagePath: string): Promise<string> {
  const fullPath = join(UPLOAD_DIR, storagePath);
  // Verify file exists
  await stat(fullPath);
  return fullPath;
}
