'use client'

import React from 'react'
import styled from 'styled-components'
import { baseLinkStyles, BlackContainer, WhiteContainer } from '@/styles/global'
import { colours } from '@/styles/variables'
import { above } from '@/styles/mixins'
import Heading from '@/components/heading'
import Main from '@/components/main'

export default function ThanksPage() {
  return (
    <Main>
      <HomeLink href="/">Home</HomeLink>
      <StatsLink href="/stats">Results</StatsLink>
      <WhiteContainer>
        <Heading>Thanks!</Heading>
      </WhiteContainer>
      <BlackContainer>
        <Content>
          <Message>
            Your guesses have been submitted successfully.
          </Message>
          <Description>
            Results will be announced at All Hands on the 3rd December.
            Check the leaderboard to see how you compare!
          </Description>
        </Content>
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

const StatsLink = styled.a`
  ${baseLinkStyles}
  right: 0;
  bottom: 0;
  color: ${colours.white};
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
