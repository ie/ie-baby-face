export interface Photo {
  id: string
  name: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface Player {
  id: string
  name: string
  createdAt: Date
}

export interface Guess {
  id: string
  playerId: string
  photoId: string
  guessedName: string
  createdAt: Date
}

export interface PlayerWithGuesses extends Player {
  guesses: Guess[]
}

export interface PhotoWithStats extends Photo {
  guesses: Guess[]
}

export interface LeaderboardEntry {
  playerId: string
  playerName: string
  correctGuesses: number
  totalGuesses: number
  createdAt: Date
}

export interface PhotoStats {
  photoId: string
  photoName: string
  imageUrl: string
  totalGuesses: number
  correctGuesses: number
  correctGuesserNames: string[]
}
