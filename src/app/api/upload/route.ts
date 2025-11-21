import { NextRequest, NextResponse } from 'next/server'
import { uploadImageFromBase64 } from '@/lib/blob-storage'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { filename, data } = body

    if (!filename || !data) {
      return NextResponse.json(
        { error: 'Filename and data are required' },
        { status: 400 }
      )
    }

    // Upload to Cloudinary
    const url = await uploadImageFromBase64(data, filename)

    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
