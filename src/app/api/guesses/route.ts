import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { playerId, photoId, guessedName } = body

    if (!playerId || !photoId || !guessedName) {
      return NextResponse.json(
        { error: 'playerId, photoId, and guessedName are required' },
        { status: 400 }
      )
    }

    // Verify player exists
    const player = await prisma.player.findUnique({
      where: { id: playerId },
    })

    if (!player) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      )
    }

    // Verify photo exists
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    })

    if (!photo) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      )
    }

    // Create or update guess (upsert to prevent duplicates)
    const guess = await prisma.guess.upsert({
      where: {
        playerId_photoId: {
          playerId,
          photoId,
        },
      },
      update: {
        guessedName,
      },
      create: {
        playerId,
        photoId,
        guessedName,
      },
    })

    return NextResponse.json(guess, { status: 201 })
  } catch (error) {
    console.error('Error creating guess:', error)
    return NextResponse.json(
      { error: 'Failed to create guess' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const playerId = searchParams.get('playerId')

    if (!playerId) {
      return NextResponse.json(
        { error: 'playerId query parameter is required' },
        { status: 400 }
      )
    }

    const guesses = await prisma.guess.findMany({
      where: {
        playerId,
      },
      include: {
        photo: true,
      },
    })

    return NextResponse.json(guesses)
  } catch (error) {
    console.error('Error fetching guesses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guesses' },
      { status: 500 }
    )
  }
}
