import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File): Promise<string> {
  // Convert File to buffer
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'baby-face',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) reject(error)
        else if (result) resolve(result.secure_url)
        else reject(new Error('Upload failed'))
      }
    ).end(buffer)
  })
}

export async function uploadImageFromBase64(
  base64Data: string,
  filename: string
): Promise<string> {
  // Remove data URL prefix if present
  const base64String = base64Data.replace(/^data:image\/\w+;base64,/, '')
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64String}`,
      {
        folder: 'baby-face',
        resource_type: 'image',
        public_id: filename.replace(/\.[^/.]+$/, ''), // Remove extension
      },
      (error, result) => {
        if (error) reject(error)
        else if (result) resolve(result.secure_url)
        else reject(new Error('Upload failed'))
      }
    )
  })
}
