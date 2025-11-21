'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import { baseLinkStyles, BlackContainer, WhiteContainer } from '@/styles/global'
import { colours } from '@/styles/variables'
import { above } from '@/styles/mixins'
import Heading from '@/components/heading'
import Main from '@/components/main'

export default function SyncPage() {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files)
    setMessage('')
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFiles || selectedFiles.length === 0) {
      setMessage('Please select files to upload')
      return
    }

    setUploading(true)
    setMessage('')

    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        // Extract name from filename (remove extension)
        const name = file.name.replace(/\.[^/.]+$/, '').replace(/-/g, ' ')
        
        // Read file as base64
        const base64 = await fileToBase64(file)
        
        // Upload to Vercel Blob (you'll need to create an API route for this)
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            filename: file.name,
            data: base64 
          }),
        })

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const { url } = await uploadResponse.json()

        // Save to database
        const photoResponse = await fetch('/api/photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, imageUrl: url }),
        })

        if (!photoResponse.ok) {
          throw new Error(`Failed to save photo for ${name}`)
        }

        return { name, success: true }
      })

      const results = await Promise.allSettled(uploadPromises)
      const successful = results.filter(r => r.status === 'fulfilled').length
      
      setMessage(`Successfully uploaded ${successful} out of ${selectedFiles.length} photos!`)
      setSelectedFiles(null)
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      
    } catch (error) {
      console.error('Upload error:', error)
      setMessage('Error uploading photos. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  return (
    <Main>
      <HomeLink href="/">Home</HomeLink>
      <WhiteContainer>
        <Heading>Sync</Heading>
      </WhiteContainer>
      <BlackContainer>
        <Content>
          <Instructions>
            <h3>Upload Baby Photos</h3>
            <p>Select photos to upload. Filenames should be the person&apos;s name (e.g., john-doe.jpg).</p>
          </Instructions>
          
          <Form onSubmit={handleUpload}>
            <FileInput
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
            />
            
            {selectedFiles && selectedFiles.length > 0 && (
              <FileList>
                Selected {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''}
              </FileList>
            )}
            
            <UploadButton type="submit" disabled={uploading || !selectedFiles}>
              {uploading ? 'Uploading...' : 'Upload Photos'}
            </UploadButton>
          </Form>

          {message && (
            <Message $isError={message.includes('Error')}>
              {message}
            </Message>
          )}
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

const Content = styled.div`
  padding: 2rem;
  max-width: 600px;

  ${above.md`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  `};
`

const Instructions = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-family: 'Gotham';
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-family: 'Gotham Book';
    font-size: 0.9rem;
    opacity: 0.8;
    line-height: 1.6;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FileInput = styled.input`
  font-family: 'Gotham Book';
  font-size: 1rem;
  padding: 1rem;
  border: 2px solid ${colours.white};
  background: transparent;
  color: ${colours.white};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::file-selector-button {
    background: ${colours.gold};
    border: none;
    color: ${colours.black};
    cursor: pointer;
    font-family: 'Gotham';
    font-weight: bold;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
  }
`

const FileList = styled.div`
  font-family: 'Gotham Book';
  font-size: 0.9rem;
  opacity: 0.8;
`

const UploadButton = styled.button`
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

const Message = styled.div<{ $isError: boolean }>`
  margin-top: 1.5rem;
  padding: 1rem;
  background: ${props => props.$isError ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 149, 0, 0.1)'};
  border: 2px solid ${props => props.$isError ? 'rgba(255, 0, 0, 0.5)' : colours.gold};
  color: ${colours.white};
  font-family: 'Gotham Book';
  font-size: 0.9rem;
`
