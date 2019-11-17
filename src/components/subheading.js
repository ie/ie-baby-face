import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SubHeading = ({ children }) => (
  <SubHeadingContainer>{children}</SubHeadingContainer>
)

export default SubHeading

const SubHeadingContainer = styled.h4`
  color: currentColor;
  font-size: 2.25rem;
`

SubHeading.propTypes = {
  children: PropTypes.node.isRequired,
}
