'use client'

import React from 'react'
import styled from 'styled-components'
import { BlackContainer, WhiteContainer, baseLinkStyles } from '@/styles/global'
import Heading from '@/components/heading'
import SubHeading from '@/components/subheading'
import Main from '@/components/main'
import { colours } from '@/styles/variables'
import { above } from '@/styles/mixins'
import { getCompetitionStatus } from '@/lib/competition'

export default function HomePage() {
  const competitionStatus = getCompetitionStatus()

  return (
    <Main>
      <AboutLink href="/about">About</AboutLink>
      <DonateLink 
        href="https://au.movember.com/donate/details?teamId=2232030" 
        target="_blank"
        rel="noopener noreferrer"
      >
        Donate
      </DonateLink>
      {competitionStatus === 'ended' ? (
        <PlayLink href="/stats">Results</PlayLink>
      ) : competitionStatus === 'coming-soon' ? (
        <PlayLink as="span">Coming Soon</PlayLink>
      ) : (
        <PlayLink href="/play">Play</PlayLink>
      )}
      <WhiteContainer>
        <Heading>Baby</Heading>
        <SubHeading>20</SubHeading>
      </WhiteContainer>
      <BlackContainer>
        <Heading>Face</Heading>
        <SubHeading>25</SubHeading>
      </BlackContainer>
    </Main>
  )
}

const AboutLink = styled.a`
  ${baseLinkStyles}
  top: 0;
  right: 0;
  color: ${colours.black};

  ${above.md`
    color: ${colours.white};
  `};
`

const DonateLink = styled.a`
  ${baseLinkStyles}
  left: 0;
  bottom: 0;
  color: ${colours.white};

  ${above.md`
    color: ${colours.black};
  `};
`

const PlayLink = styled.a`
  ${baseLinkStyles}
  right: 0;
  bottom: 0;
  color: ${colours.white};
  cursor: ${props => props.as === 'span' ? 'default' : 'pointer'};
`
