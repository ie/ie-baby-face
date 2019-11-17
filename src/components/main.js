import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { above } from '../styles/mixins'

const Main = ({ children }) => <MainContainer>{children}</MainContainer>

export default Main

const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-height: 100vh;

  ${above.md`
    flex-direction: row;
  `};
`

Main.propTypes = {
  children: PropTypes.node.isRequired,
}
