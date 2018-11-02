import React from 'react'
import styled from 'styled-components'
import Obfuscate from 'react-obfuscate'

// Components
import Layout from '../components/layout'
import Heading from '../components/heading'
import Main from '../components/main'
import ContainerTransition from '../components/containerTransition'

// CSS
import { above } from '../styles/mixins'
import { colours, timings } from '../styles/variables'
import { baseLinkStyles, BaseLink, WhiteContainer, BlackContainer } from '../styles/global'

const AboutPage = () => (
  <Layout>
    <Main>
      <CloseLink to="/">
        <svg width="56px" height="56px" focusable="false" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
                <g transform="translate(-1337.000000, -47.000000)" stroke="#000000" strokeWidth="4">
                    <g transform="translate(1340.000000, 50.000000)">
                        <path d="M49.7282609,0.27173913 L0.265020762,49.7349792"></path>
                        <path d="M49.7282609,0.27173913 L0.265020762,49.7349792" transform="translate(25.000000, 25.000000) scale(-1, 1) translate(-25.000000, -25.000000)"></path>
                    </g>
                </g>
            </g>
        </svg>
      </CloseLink>
      <DonateLink href="https://mosista.co/13821510" target="_blank">Donate</DonateLink>
      <PlayLink to="/play">Play</PlayLink>
      <WhiteContainer>
        <ContainerTransition direction="left">
          <Heading>About</Heading>
        </ContainerTransition>
      </WhiteContainer>
      <BlackContainer>
        <ContainerTransition direction="right">
          <Block>
            <List>
              <ListItem><span>Send your best baby picture to {' '}</span>
                <Obfuscate
                  email='matilda.rutherford@ie.com.au'
                  headers={{
                    subject: 'Baby Face'
                  }}>@Matilda</Obfuscate>
              </ListItem>
              <ListItem>
                <span>Make a small</span> donation <span>to Movember</span>
              </ListItem>
              <ListItem>
                <span>Start</span> playing
              </ListItem>
            </List>
            <Copy>Please only enter once and be a generous in your donations as you see fair (although a minimum $5 is preferred).</Copy>
             <Copy>The winner with the most correct answers will be announced at All Agency on the 30th November.</Copy>
          </Block>
        </ContainerTransition>
      </BlackContainer>
    </Main>
  </Layout>
)

export default AboutPage

const CloseLink = styled(BaseLink)`
  right: 0;
  top: 0;
  transition: transform ${timings.md}s ease-in-out;

  ${above.md`
    filter: invert(100%);
  `}

  &:hover {
    transform: scale(1.1);
  }
`

const DonateLink = styled.a`
  ${baseLinkStyles}
  bottom: 0;
  color: ${colours.white};
  left: 0;

  ${above.md`
    color: ${colours.black};
  `}
`

const PlayLink = styled(BaseLink)`
  bottom: 0;
  color: ${colours.white};
  right: 0;
`

const Block = styled.div`
`

const List = styled.ol`
  margin: 0;
  padding: 1.8rem;
`

const ListItem = styled.li`
  padding-left: 1rem;

  span {
    font-family: 'Gotham Book';
  }

  a,
  a:hover,
  a:visited {
    color: ${colours.gold};
    text-decoration: none;
  }
`

const Copy = styled.p`
  font-family: 'Gotham Book';
  font-size: .8rem;
  opacity: .5;
  margin: 0 0 0 2.8rem;
  width: 65%;
`
