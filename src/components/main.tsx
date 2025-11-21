'use client'

import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { above } from '@/styles/mixins'

interface MainProps {
  children: ReactNode
}

export default function Main({ children }: MainProps) {
  return <MainContainer>{children}</MainContainer>
}

const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-height: 100vh;

  ${above.md`
    flex-direction: row;
  `};
`
