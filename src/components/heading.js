import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Heading = ({ children }) => (
  <HeadingContainer>{children}</HeadingContainer>
)

export default Heading

const HeadingContainer = styled.h2`
  color: currentColor;
  font-size: 6.25rem;
`

Heading.propTypes = {
  children: PropTypes.node.isRequired,
}
