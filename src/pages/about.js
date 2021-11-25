import {
  BaseLink,
  BlackContainer,
  WhiteContainer,
  baseLinkStyles,
} from '../styles/global'
import { colours, timings } from '../styles/variables'

import Heading from '../components/heading'
// Components
import Layout from '../components/layout'
import Main from '../components/main'
import Obfuscate from 'react-obfuscate'
import React from 'react'
// CSS
import { above } from '../styles/mixins'
import styled from 'styled-components'

const AboutPage = () => (
  <Layout>
    <Main>
      <CloseLink to="/">
        <svg
          width="56px"
          height="56px"
          focusable="false"
          viewBox="0 0 56 56"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="square"
          >
            <g
              transform="translate(-1337.000000, -47.000000)"
              stroke="#000000"
              strokeWidth="4"
            >
              <g transform="translate(1340.000000, 50.000000)">
                <path d="M49.7282609,0.27173913 L0.265020762,49.7349792" />
                <path
                  d="M49.7282609,0.27173913 L0.265020762,49.7349792"
                  transform="translate(25.000000, 25.000000) scale(-1, 1) translate(-25.000000, -25.000000)"
                />
              </g>
            </g>
          </g>
        </svg>
      </CloseLink>
      <DonateLink href="https://au.movember.com/donate/details?teamId=2232030" target="_blank">
        Donate
      </DonateLink>
      <PlayLink to="/play">Play</PlayLink>
      <WhiteContainer>
        <Heading>About</Heading>
      </WhiteContainer>
      <BlackContainer>
        <Block>
          <List>
            <ListItem>
              <span>Send your best baby picture to </span>
              <Obfuscate
                email="tim.burchn@ie.com.au"
                headers={{
                  subject: 'Baby Face',
                }}
              >
                @tim
              </Obfuscate>
            </ListItem>
            <ListItem>
              <span>Make a small</span> donation <span>to Movember</span>
            </ListItem>
            <ListItem>
              <span>Start</span> playing
            </ListItem>
          </List>
          <Copy>
            Please only enter once and be as generous in your donations as you see fair (although a minimum $5 is preferred).
          </Copy>
          {' '}
          <Copy>
            The winner with the most correct answers will be announced at All Hands on the 3rd December.
          </Copy>
        </Block>
      </BlackContainer>
    </Main>
  </Layout>
)

export default AboutPage

const CloseLink = styled(BaseLink)`
  right: 0;
  top: 0;
  transition: transform ${timings.md}s ease-in-out;

  svg {
    width: 50px;
    height: 50px;
  }

  ${above.md`
    filter: invert(100%);
  `} &:hover {
    transform: scale(1.1);
  }
`

const DonateLink = styled.a`
  ${baseLinkStyles} bottom: 0;
  color: ${colours.white};
  left: 0;

  ${above.md`
    color: ${colours.black};
  `};
`

const PlayLink = styled(BaseLink)`
  bottom: 0;
  color: ${colours.white};

  right: 0;
`

const Block = styled.div`
  ${above.md`
    position: absolute;
    top: calc(50% - 4.15rem);
  `};
`

const List = styled.ol`
  margin: 0;
  padding: 1.8rem;
`

const ListItem = styled.li`
  padding-left: 1.7rem;
  line-height: 1.4;

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
  margin: 0 0 1rem 3.5rem;
  padding: 0;
  display: inline-block;

  ${above.sm`
    width: 45%;
  `}

  ${above.md`
    width: 65%;
  `}

  ${above.lg`
    width: 45%;
  `}
`
