'use client'

import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface HeadingProps {
  children: ReactNode
}

export default function Heading({ children }: HeadingProps) {
  return <HeadingContainer>{children}</HeadingContainer>
}

const HeadingContainer = styled.h2`
  color: currentColor;
  font-size: 6.25rem;
`
