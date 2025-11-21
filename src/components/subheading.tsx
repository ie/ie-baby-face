'use client'

import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface SubHeadingProps {
  children: ReactNode
}

export default function SubHeading({ children }: SubHeadingProps) {
  return <SubHeadingContainer>{children}</SubHeadingContainer>
}

const SubHeadingContainer = styled.h4`
  color: currentColor;
  font-size: 2.25rem;
`
