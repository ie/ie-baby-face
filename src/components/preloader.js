import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { above } from '../styles/mixins'
import { colours } from '../styles/variables'

class Preloader extends Component {
  constructor() {
    super()
    this.state = {
      duration: 5.0,
    }
  }

  componentDidMount() {
    this.setState(prevState => {
      return { duration: this.props.duration || prevState.duration }
    })
  }

  render() {
    const { loaded, loading } = this.props
    const { duration } = this.state

    return (
      <>
        {loading ? (
          <PreloaderWrapper className={classNames({ loaded: loaded })}>
            <PreloaderContainer>
              <Spinner duration={duration} loaded={loaded} />
              <Fill duration={duration} loaded={loaded} />
              <Mask duration={duration} loaded={loaded} />
            </PreloaderContainer>
          </PreloaderWrapper>
        ) : (
          false
        )}
      </>
    )
  }
}

export default Preloader

Preloader.propTypes = {
  loaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

const fillAnimation = keyframes`
  0% {
    opacity: 0;
  }

  50%, 100% {
    opacity: 1;
  }
`
const maskAnimation = keyframes`
  0% {
    opacity: 1;
  }

  50%, 100% {
    opacity: 0;
  }
`

const PreloaderWrapper = styled.div`
  position: absolute;
  left: 50vw;
  top: 50vh;
  z-index: 1;
  transform: translate(-50%, -50%);

  &.loaded {
    display: none;
  }
`

const PreloaderContainer = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  background: linear-gradient(
    to bottom,
    ${colours.white} 0%,
    ${colours.white} 50%,
    ${colours.black} 50%,
    ${colours.black} 100%
  );

  ${above.md`
    background: linear-gradient(
      to right,
      ${colours.white} 0%,
      ${colours.white} 50%,
      ${colours.black} 50%,
      ${colours.black} 100%
    );
  `};
`

const Pie = styled.div`
  width: 100%;
  height: 50%;
  position: absolute;
  background-color: ${colours.gold};
  transform-origin: 50% 100%;

  ${above.md`
    width: 50%;
    height: 100%;
    transform-origin: 100% 50%;
  `};
`

const Spinner = styled(Pie)`
  animation: ${spinnerAnimation} ${props => props.duration}s linear infinite;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  border-right: none;
  z-index: 200;

  ${above.md`
    border-radius: 100% 0 0 100% / 50% 0 0 50%;
  `};
`

const Fill = styled(Pie)`
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  z-index: 3;
  border-left: none;
  animation: ${fillAnimation} ${props => props.duration}s steps(1, end) infinite;
  top: 50%;
  left: auto;
  opacity: 0;

  ${above.md`
    border-radius: 0 100% 100% 0 / 0 50% 50% 0;
    left: 50%;
    top: auto;
  `};
`

const Mask = styled.div`
  width: 100%;
  height: 50%;
  position: absolute;
  z-index: 1000;
  opacity: 1;
  background: ${colours.white};
  animation: ${maskAnimation} ${props => props.duration}s steps(1, end) infinite;

  ${above.md`
    width: 50%;
    height: 100%;
  `};
`
