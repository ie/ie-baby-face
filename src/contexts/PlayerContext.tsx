'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface PlayerContextType {
  playerId: string | null
  playerName: string | null
  setPlayer: (id: string, name: string) => void
  clearPlayer: () => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [playerName, setPlayerName] = useState<string | null>(null)

  const setPlayer = (id: string, name: string) => {
    setPlayerId(id)
    setPlayerName(name)
  }

  const clearPlayer = () => {
    setPlayerId(null)
    setPlayerName(null)
  }

  return (
    <PlayerContext.Provider value={{ playerId, playerName, setPlayer, clearPlayer }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}
