'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { baseLinkStyles, BlackContainer, WhiteContainer } from '@/styles/global'
import { colours } from '@/styles/variables'
import { above } from '@/styles/mixins'
import Heading from '@/components/heading'
import Main from '@/components/main'
import type { LeaderboardEntry, PhotoStats } from '@/types'

export default function StatsPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [photoStats, setPhotoStats] = useState<PhotoStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      
      const data = await response.json()
      setLeaderboard(data.leaderboard)
      setPhotoStats(data.photoStats)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching stats:', error)
      setLoading(false)
    }
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

  return (
    <Main>
      <HomeLink href="/">Home</HomeLink>
      <PlayLink href="/play">Play</PlayLink>
      <WhiteContainer>
        <Heading>Stats</Heading>
        <LeaderboardSection>
          <SectionTitle>Leaderboard</SectionTitle>
          {leaderboard.length === 0 ? (
            <EmptyMessage>No players yet!</EmptyMessage>
          ) : (
            <LeaderboardList>
              {leaderboard.map((entry, index) => (
                <LeaderboardItem key={entry.playerId} $rank={index + 1}>
                  <Rank>{index + 1}.</Rank>
                  <PlayerName>{entry.playerName}</PlayerName>
                  <Score>
                    {entry.correctGuesses} / {entry.totalGuesses}
                  </Score>
                </LeaderboardItem>
              ))}
            </LeaderboardList>
          )}
        </LeaderboardSection>
      </WhiteContainer>
      <BlackContainer>
        <PhotoStatsSection>
          <SectionTitle>Photo Statistics</SectionTitle>
          {photoStats.length === 0 ? (
            <EmptyMessage>No stats available yet!</EmptyMessage>
          ) : (
            <PhotoStatsList>
              {photoStats.map((stat) => (
                <PhotoStatItem key={stat.photoId}>
                  <PhotoThumb>
                    <Image
                      src={stat.imageUrl}
                      alt={stat.photoName}
                      width={80}
                      height={80}
                    />
                  </PhotoThumb>
                  <PhotoInfo>
                    <PhotoName>{stat.photoName}</PhotoName>
                    <PhotoScore>
                      {stat.correctGuesses} correct out of {stat.totalGuesses} guesses
                    </PhotoScore>
                    {stat.correctGuesserNames.length > 0 && (
                      <CorrectGuessers>
                        ✓ {stat.correctGuesserNames.join(', ')}
                      </CorrectGuessers>
                    )}
                  </PhotoInfo>
                </PhotoStatItem>
              ))}
            </PhotoStatsList>
          )}
        </PhotoStatsSection>
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

const PlayLink = styled.a`
  ${baseLinkStyles}
  right: 0;
  bottom: 0;
  color: ${colours.white};
`

const LeaderboardSection = styled.div`
  padding: 2rem;
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
`

const PhotoStatsSection = styled.div`
  padding: 2rem;
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
`

const SectionTitle = styled.h3`
  font-family: 'Gotham';
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`

const EmptyMessage = styled.p`
  font-family: 'Gotham Book';
  font-size: 1rem;
  opacity: 0.7;
`

const LeaderboardList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`

const LeaderboardItem = styled.li<{ $rank: number }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: ${props => props.$rank === 1 ? colours.gold : 
               props.$rank === 2 ? 'rgba(192, 192, 192, 0.2)' :
               props.$rank === 3 ? 'rgba(205, 127, 50, 0.2)' : 'transparent'};
  border: ${props => props.$rank <= 3 ? '2px solid currentColor' : '1px solid rgba(0, 0, 0, 0.1)'};
  color: ${props => props.$rank === 1 ? colours.black : colours.black};
  font-weight: ${props => props.$rank <= 3 ? 'bold' : 'normal'};
`

const Rank = styled.span`
  font-family: 'Gotham';
  font-size: 1.2rem;
  min-width: 2rem;
`

const PlayerName = styled.span`
  font-family: 'Gotham Book';
  font-size: 1rem;
  flex: 1;
`

const Score = styled.span`
  font-family: 'Gotham';
  font-size: 1rem;
`

const PhotoStatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const PhotoStatItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const PhotoThumb = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
  }
`

const PhotoInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const PhotoName = styled.div`
  font-family: 'Gotham';
  font-size: 1rem;
  font-weight: bold;
`

const PhotoScore = styled.div`
  font-family: 'Gotham Book';
  font-size: 0.9rem;
  opacity: 0.8;
`

const CorrectGuessers = styled.div`
  font-family: 'Gotham Book';
  font-size: 0.85rem;
  color: ${colours.gold};
  margin-top: 0.25rem;
`
