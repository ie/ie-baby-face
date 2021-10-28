import {
  BaseLink,
  BlackContainer,
  WhiteContainer,
  baseLinkStyles,
} from '../styles/global'
import React, { Component } from 'react'

// Components
import Layout from '../components/layout'
import Main from '../components/main'
import Moustache from '../components/moustache'
import Preloader from '../components/preloader'
// CSS
import { colours } from '../styles/variables'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import styled from 'styled-components'

class DonatePage extends Component {
  constructor() {
    super()
    this.state = {
      loaded: true,
      loading: false,
    }
  }

  render() {
    return (
      <Layout>
        <Main>
          <Preloader
            duration="1.0"
            loading={this.state.loading}
            loaded={this.state.loaded}
          />
          {this.state.loading ? <Moustache /> : false}
          {this.state.loaded ? (
            <GuessLink to="/guess" onClick={() => navigate('/guess')}>
              Skip
            </GuessLink>
          ) : null}
          <WhiteContainer>
            {this.state.loaded ? (
              <Prompt style={{ textAlign: 'right' }}>
                Have you made a <br />
                donation to Movember?
              </Prompt>
            ) : (
              false
            )}
          </WhiteContainer>
          <BlackContainer>
            {this.state.loaded ? (
              <DonateLink href="https://au.movember.com/donate/details?teamId=2232030" target="_blank">
                Donate
              </DonateLink>
            ) : (
              false
            )}
          </BlackContainer>
        </Main>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
    documentId: state.documentId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDocumentId: documentId =>
      dispatch({
        type: 'DOCUMENT_SAVE',
        documentId: documentId,
      }),
    register: name =>
      dispatch({
        type: 'REGISTER',
        name: name,
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DonatePage)

const GuessLink = styled(BaseLink)`
  right: 0;
  bottom: 0;
  color: ${colours.white};
`

const DonateLink = styled.a`
  ${baseLinkStyles} top: 50%;
  transform: translateY(-50%);
  color: ${colours.white};
`

const Prompt = styled.h4`
  font-size: 2.25rem;
`
