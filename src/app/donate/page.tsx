'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import { baseLinkStyles, BlackContainer, WhiteContainer } from '@/styles/global'
import { colours } from '@/styles/variables'
import { above } from '@/styles/mixins'
import { usePlayer } from '@/contexts/PlayerContext'
import Heading from '@/components/heading'
import Main from '@/components/main'

export default function DonatePage() {
  const router = useRouter()
  const { playerName } = usePlayer()

  useEffect(() => {
    if (!playerName) {
      router.push('/play')
    }
  }, [playerName, router])

  if (!playerName) {
    return null
  }

  return (
    <Main>
      <SkipLink href="/guess">Skip</SkipLink>
      <WhiteContainer>
        <Heading>Donate</Heading>
      </WhiteContainer>
      <BlackContainer>
        <Content>
          <Message>
            Thanks for playing, {playerName}!
          </Message>
          <Description>
            Please consider making a donation to Movember before you start.
            A minimum of $5 is preferred.
          </Description>
          <DonateButton
            href="https://au.movember.com/donate/details?teamId=2232030"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donate to Movember
          </DonateButton>
          <ContinueLink href="/guess">
            Continue to Game →
          </ContinueLink>
        </Content>
      </BlackContainer>
    </Main>
  )
}

const SkipLink = styled.a`
  ${baseLinkStyles}
  right: 0;
  top: 0;
  color: ${colours.black};

  ${above.md`
    color: ${colours.white};
  `};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  padding: 2rem;

  ${above.md`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  `};
`

const Message = styled.h3`
  font-family: 'Gotham';
  font-size: 1.5rem;
  margin: 0;
`

const Description = styled.p`
  font-family: 'Gotham Book';
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`

const DonateButton = styled.a`
  background: ${colours.gold};
  border: none;
  color: ${colours.black};
  cursor: pointer;
  font-family: 'Gotham';
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const ContinueLink = styled.a`
  color: ${colours.white};
  font-family: 'Gotham Book';
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colours.gold};
  }
`
