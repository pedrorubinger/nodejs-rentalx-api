import fs from "fs"

export const deleteFile = async (fileName: string) => {
  try {
    // Check if file exists
    await fs.promises.stat(fileName)
  } catch (err) {
    return
  }

  // Remove file
  await fs.promises.unlink(fileName)
}
