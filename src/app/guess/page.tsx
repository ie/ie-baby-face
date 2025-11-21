'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import Image from 'next/image'
import { baseLinkStyles, BlackContainer, WhiteContainer } from '@/styles/global'
import { colours } from '@/styles/variables'
import { above } from '@/styles/mixins'
import { usePlayer } from '@/contexts/PlayerContext'
import Heading from '@/components/heading'
import Main from '@/components/main'
import type { Photo } from '@/types'

export default function GuessPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [guesses, setGuesses] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { playerId, playerName } = usePlayer()

  useEffect(() => {
    if (!playerId || !playerName) {
      router.push('/play')
      return
    }

    fetchPhotos()
  }, [playerId, playerName, router])

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos')
      if (!response.ok) throw new Error('Failed to fetch photos')
      
      const data = await response.json()
      // Shuffle photos for randomization
      const shuffled = [...data].sort(() => Math.random() - 0.5)
      setPhotos(shuffled)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching photos:', error)
      setLoading(false)
    }
  }

  const handleGuess = async (photoId: string, guessedName: string) => {
    setGuesses(prev => ({ ...prev, [photoId]: guessedName }))

    // Save guess immediately
    if (playerId) {
      try {
        await fetch('/api/guesses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerId, photoId, guessedName }),
        })
      } catch (error) {
        console.error('Error saving guess:', error)
      }
    }

    // Move to next photo
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleFinish = async () => {
    setSubmitting(true)
    router.push('/thanks')
  }

  if (!playerId || !playerName) {
    return null
  }

  if (loading) {
    return (
      <Main>
        <WhiteContainer>
          <Heading>Loading...</Heading>
        </WhiteContainer>
        <BlackContainer />
      </Main>
    )
  }

  const currentPhoto = photos[currentIndex]
  const allNames = photos.map(p => p.name).sort()
  const usedNames = Object.values(guesses)
  const progress = Object.keys(guesses).length
  const total = photos.length

  return (
    <Main>
      <HomeLink href="/">Home</HomeLink>
      <Progress>
        {progress} / {total}
      </Progress>
      <WhiteContainer>
        {currentPhoto && (
          <PhotoContainer>
            <StyledImage
              src={currentPhoto.imageUrl}
              alt="Baby photo"
              width={400}
              height={400}
              priority
            />
          </PhotoContainer>
        )}
      </WhiteContainer>
      <BlackContainer>
        <NameList>
          <Instruction>Who is this?</Instruction>
          {allNames.map((name) => {
            const isUsed = usedNames.includes(name)
            const isCurrent = guesses[currentPhoto?.id] === name
            
            return (
              <NameButton
                key={name}
                onClick={() => !isUsed && currentPhoto && handleGuess(currentPhoto.id, name)}
                disabled={isUsed && !isCurrent}
                $isUsed={isUsed}
                $isCurrent={isCurrent}
              >
                {name}
              </NameButton>
            )
          })}
          {progress === total && (
            <FinishButton onClick={handleFinish} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Finish & Submit'}
            </FinishButton>
          )}
        </NameList>
      </BlackContainer>
    </Main>
  )
}

const HomeLink = styled.a`
  ${baseLinkStyles}
  left: 0;
  top: 0;
  color: ${colours.black};

  ${above.md`
    color: ${colours.white};
  `};
`

const Progress = styled.div`
  ${baseLinkStyles}
  right: 0;
  top: 0;
  color: ${colours.black};
  cursor: default;

  &:hover {
    color: ${colours.black};
    font-style: normal;
  }

  ${above.md`
    color: ${colours.white};
    
    &:hover {
      color: ${colours.white};
    }
  `};
`

const PhotoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
`

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  max-width: 400px;
  object-fit: contain;
  filter: grayscale(100%);
`

const NameList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem;
  max-height: 100%;
  overflow-y: auto;

  ${above.md`
    max-width: 500px;
  `};
`

const Instruction = styled.h3`
  font-family: 'Gotham';
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${colours.white};
`

const NameButton = styled.button<{ $isUsed: boolean; $isCurrent: boolean }>`
  background: ${props => props.$isCurrent ? colours.gold : 'transparent'};
  border: 2px solid ${props => props.$isUsed ? 'rgba(255, 255, 255, 0.3)' : colours.white};
  color: ${props => props.$isCurrent ? colours.black : props.$isUsed ? 'rgba(255, 255, 255, 0.4)' : colours.white};
  cursor: ${props => props.$isUsed && !props.$isCurrent ? 'not-allowed' : 'pointer'};
  font-family: 'Gotham Book';
  font-size: 1rem;
  padding: 0.75rem 1rem;
  text-align: left;
  text-decoration: ${props => props.$isUsed && !props.$isCurrent ? 'line-through' : 'none'};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${colours.gold};
    color: ${colours.black};
    transform: translateX(5px);
  }

  &:disabled {
    opacity: ${props => props.$isCurrent ? 1 : 0.5};
  }
`

const FinishButton = styled.button`
  background: ${colours.gold};
  border: none;
  color: ${colours.black};
  cursor: pointer;
  font-family: 'Gotham';
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  transition: transform 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
