'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import { baseLinkStyles, BlackContainer, WhiteContainer } from '@/styles/global'
import { colours } from '@/styles/variables'
import { above } from '@/styles/mixins'
import { usePlayer } from '@/contexts/PlayerContext'
import Heading from '@/components/heading'
import Main from '@/components/main'

export default function PlayPage() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setPlayer } = usePlayer()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      })

      if (!response.ok) {
        throw new Error('Failed to create player')
      }

      const player = await response.json()
      setPlayer(player.id, player.name)
      router.push('/donate')
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <Main>
      <CloseLink href="/">Close</CloseLink>
      <WhiteContainer>
        <Heading>Play</Heading>
      </WhiteContainer>
      <BlackContainer>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">Enter your name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            disabled={loading}
            autoFocus
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Continue'}
          </Button>
        </Form>
      </BlackContainer>
    </Main>
  )
}

const CloseLink = styled.a`
  ${baseLinkStyles}
  right: 0;
  top: 0;
  color: ${colours.black};

  ${above.md`
    color: ${colours.white};
  `};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 400px;
  width: 100%;
  padding: 2rem;

  ${above.md`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  `};
`

const Label = styled.label`
  font-family: 'Gotham Book';
  font-size: 1.2rem;
`

const Input = styled.input`
  background: transparent;
  border: 2px solid ${colours.white};
  color: ${colours.white};
  font-family: 'Gotham Book';
  font-size: 1.2rem;
  padding: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${colours.gold};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Button = styled.button`
  background: ${colours.gold};
  border: none;
  color: ${colours.black};
  cursor: pointer;
  font-family: 'Gotham';
  font-size: 1.2rem;
  font-weight: bold;
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

const ErrorMessage = styled.p`
  color: ${colours.gold};
  font-family: 'Gotham Book';
  font-size: 0.9rem;
  margin: -0.5rem 0 0;
`
