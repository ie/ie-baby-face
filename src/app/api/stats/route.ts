import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { LeaderboardEntry, PhotoStats } from '@/types'

export async function GET() {
  try {
    // Fetch all players with their guesses
    const players = await prisma.player.findMany({
      include: {
        guesses: {
          include: {
            photo: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Fetch all photos
    const photos = await prisma.photo.findMany({
      include: {
        guesses: {
          include: {
            player: true,
          },
        },
      },
    })

    // Calculate leaderboard
    const leaderboard: LeaderboardEntry[] = players.map((player) => {
      const correctGuesses = player.guesses.filter(
        (guess) => guess.guessedName === guess.photo.name
      ).length

      return {
        playerId: player.id,
        playerName: player.name,
        correctGuesses,
        totalGuesses: player.guesses.length,
        createdAt: player.createdAt,
      }
    }).sort((a, b) => {
      // Sort by correct guesses (descending), then by timestamp (ascending)
      if (b.correctGuesses !== a.correctGuesses) {
        return b.correctGuesses - a.correctGuesses
      }
      return a.createdAt.getTime() - b.createdAt.getTime()
    })

    // Calculate photo statistics
    const photoStats: PhotoStats[] = photos.map((photo) => {
      const correctGuesses = photo.guesses.filter(
        (guess) => guess.guessedName === photo.name
      )

      return {
        photoId: photo.id,
        photoName: photo.name,
        imageUrl: photo.imageUrl,
        totalGuesses: photo.guesses.length,
        correctGuesses: correctGuesses.length,
        correctGuesserNames: correctGuesses.map((guess) => guess.player.name),
      }
    }).sort((a, b) => {
      // Sort by total guesses (descending)
      return b.totalGuesses - a.totalGuesses
    })

    return NextResponse.json({
      leaderboard,
      photoStats,
      totalPlayers: players.length,
      totalPhotos: photos.length,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
