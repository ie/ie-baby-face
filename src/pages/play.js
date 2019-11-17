import React, { Component } from 'react'
import styled from 'styled-components'
import { db } from '../config/firebase'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'

// Components
import Layout from '../components/layout'
import SubHeading from '../components/subheading'
import Main from '../components/main'
import Preloader from '../components/preloader'
import Moustache from '../components/moustache'

// CSS
import { colours, spacing } from '../styles/variables'
import { BaseLink, WhiteContainer, BlackContainer } from '../styles/global'

class PlayPage extends Component {
  constructor() {
    super()
    this.state = {
      loaded: true,
      loading: false,
    }
  }
  componentDidMount() {
    this.nameInput.focus()
  }

  createDocument(e, callback) {
    e.preventDefault()

    this.setState({ loaded: false, loading: true })

    db.collection('guesses')
      .add({
        name: this.props.name,
      })
      .then(docRef => {
        callback(docRef.id)
        navigate('/donate')
      })
  }

  render() {
    const { name, register, saveDocumentId } = this.props
    return (
      <Layout>
        <Main>
          <Preloader
            duration="2.0"
            loading={this.state.loading}
            loaded={this.state.loaded}
          />
          {this.state.loading ? <Moustache /> : false}
          {this.state.loaded && name ? (
            <GuessLink
              to="/donate"
              onClick={e => this.createDocument(e, saveDocumentId)}
            >
              Next
            </GuessLink>
          ) : null}
          <WhiteContainer>
            {this.state.loaded ? <SubHeading>Your name:</SubHeading> : false}
          </WhiteContainer>
          <BlackContainer>
            {this.state.loaded ? (
              <form
                method="post"
                onSubmit={e => this.createDocument(e, saveDocumentId)}
              >
                <Input
                  type="text"
                  name="name"
                  ref={input => {
                    this.nameInput = input
                  }}
                  value={name}
                  onChange={e => register(e.target.value)}
                />
              </form>
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
)(PlayPage)

const Input = styled.input`
  background: ${colours.black};
  border-bottom: 3px solid ${colours.white};
  border-left: 0;
  border-right: 0;
  border-top: 0;
  color: ${colours.white};
  font-family: 'Gotham Book', sans-serif;
  font-size: 2rem;
  min-width: 20rem;
  outline: 0;
  padding: ${spacing.xs};
  text-align: center;
`

const GuessLink = styled(BaseLink)`
  right: 0;
  bottom: 0;
  color: ${colours.white};
`
