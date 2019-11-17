import React from 'react'
import styled from 'styled-components'

// Components
import Layout from '../components/layout'

// CSS
import { above } from '../styles/mixins'
import { WhiteContainer } from '../styles/global'

const IndexPage = () => (
  <Layout>
    <WhiteContainerFull>
      <Heading>Thank you</Heading>
    </WhiteContainerFull>
  </Layout>
)

export default IndexPage

const WhiteContainerFull = styled(WhiteContainer)`
  ${above.md`
    width: 100vw;
    align-items: center;
  `};
`

const Heading = styled.h3`
  color: currentColor;
  font-size: 2.125rem;
`
