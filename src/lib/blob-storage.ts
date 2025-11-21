import { put } from '@vercel/blob'

export async function uploadImage(file: File): Promise<string> {
  const blob = await put(file.name, file, {
    access: 'public',
    addRandomSuffix: true,
  })
  return blob.url
}

export async function uploadImageFromBase64(
  base64Data: string,
  filename: string
): Promise<string> {
  // Remove data URL prefix if present
  const base64String = base64Data.replace(/^data:image\/\w+;base64,/, '')
  
  // Convert base64 to buffer
  const buffer = Buffer.from(base64String, 'base64')
  
  // Create a File-like object
  const blob = new Blob([buffer])
  const file = new File([blob], filename, { type: 'image/jpeg' })
  
  return uploadImage(file)
}
