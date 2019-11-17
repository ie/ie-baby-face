import React, { Component } from 'react'
import styled from 'styled-components'

// Components
import Layout from '../components/layout'
import Heading from '../components/heading'
import Main from '../components/main'

// CSS
import { above } from '../styles/mixins'
import { colours } from '../styles/variables'
import {
  baseLinkStyles,
  BaseLink,
  WhiteContainer,
  BlackContainer,
} from '../styles/global'
import SubHeading from '../components/subheading'

class IndexPage extends Component {
  render() {
    return (
      <Layout>
        <Main>
          <AboutLink to="/about">About</AboutLink>
          <DonateLink href="https://mosista.co/babyface-ie" target="_blank">
            Donate
          </DonateLink>
          <PlayLink to="/play">Play</PlayLink>
          <WhiteContainer>
            <Heading>Baby</Heading>
            <SubHeading>20</SubHeading>
          </WhiteContainer>
          <BlackContainer>
            <Heading>Face</Heading>
            <SubHeading>19</SubHeading>
          </BlackContainer>
        </Main>
      </Layout>
    )
  }
}

export default IndexPage

const AboutLink = styled(BaseLink)`
  top: 0;
  right: 0;
  color: ${colours.black};

  ${above.md`
    color: ${colours.white};
  `};
`

const DonateLink = styled.a`
  ${baseLinkStyles} left: 0;
  bottom: 0;
  color: ${colours.white};

  ${above.md`
    color: ${colours.black};
  `};
`

const PlayLink = styled(BaseLink)`
  right: 0;
  bottom: 0;
  color: ${colours.white};
`
