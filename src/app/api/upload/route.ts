import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

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

    // Remove data URL prefix if present
    const base64String = data.replace(/^data:image\/\w+;base64,/, '')
    
    // Convert base64 to buffer
    const buffer = Buffer.from(base64String, 'base64')
    
    // Upload to Vercel Blob Storage
    const blob = await put(filename, buffer, {
      access: 'public',
      addRandomSuffix: true,
    })

    return NextResponse.json({ url: blob.url }, { status: 200 })
  } catch (error) {
    console.error('Error uploading to blob storage:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
