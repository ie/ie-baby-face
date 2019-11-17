import React, { Component } from 'react'
import { db } from '../config/firebase'
import styled from 'styled-components'

// Components
import Layout from '../components/layout'
import Heading from '../components/heading'
import Main from '../components/main'
import Preloader from '../components/preloader'
import Moustache from '../components/moustache'

// CSS
import { WhiteContainer, BlackContainer } from '../styles/global'

class StatsPage extends Component {
  constructor() {
    super()
    this.state = {
      photos: [],
      guesses: [],
      parsed: 0,
      loaded: false,
      loading: true,
    }
  }

  getPhotos(snapshot) {
    snapshot.forEach(doc => {
      this.setState(prevState => {
        return {
          photos: [...prevState.photos, { id: doc.id, name: doc.data().name }],
        }
      })
    })
  }

  checkIfFinished() {
    if (this.state.parsed === this.state.guesses.length) {
      // Dedupe guesses by name, and take the most number correct
      const filteredGuesses = this.state.guesses.filter(g => {
        return (
          this.state.guesses.filter(e => {
            return e.name === g.name && e.correct > g.correct
          }).length === 0
        )
      })

      this.setState(prevState => {
        return { guesses: filteredGuesses, loaded: true, loading: false }
      })
    }
  }

  getGuesses(snapshot) {
    snapshot.forEach(doc => {
      this.setState(prevState => {
        return {
          guesses: [
            ...prevState.guesses,
            { id: doc.id, name: doc.data().name, guesses: [] },
          ],
        }
      })

      const guess = this.state.guesses.filter(guess => guess.id === doc.id)[0]

      doc.ref
        .collection('guesses')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            guess.guesses.push(doc.data())
          })

          // Compare this session's guesses with actual and calculate total
          if (guess) {
            guess.correct = this.state.photos.filter(photo => {
              return guess.guesses.some(
                e => e.photo === photo.id && e.name === photo.name
              )
            }).length
          }

          // Bump parsed state
          this.setState(
            prevState => {
              return { parsed: prevState.parsed + 1 }
            },
            () => this.checkIfFinished()
          )
        })
    })
  }

  sortGuesses(a, b) {
    return b.correct - a.correct
  }

  queryGuesses() {
    db.collection('guesses')
      .get()
      .then(snapshot => this.getGuesses(snapshot))
  }

  componentDidMount() {
    db.collection('photos')
      .get()
      .then(snapshot => this.getPhotos(snapshot))
      .then(() => this.queryGuesses())
  }

  render() {
    return (
      <Layout>
        <Main>
          <Preloader loading={this.state.loading} loaded={this.state.loaded} />
          {!this.state.loaded ? <Moustache /> : false}
          <WhiteContainer>
            {this.state.loaded ? <Heading>Winners</Heading> : false}
          </WhiteContainer>
          <BlackContainer>
            <List>
              {this.state.loaded &&
                this.state.guesses
                  .filter(guess => guess.guesses.length > 0)
                  .sort(this.sortGuesses)
                  .map((guess, index) => {
                    return (
                      <ListItem key={index}>
                        {guess.name} - {guess.correct}/{guess.guesses.length} (
                        {Math.round(
                          (guess.correct / guess.guesses.length) * 100
                        )}
                        %)
                      </ListItem>
                    )
                  })}
            </List>
          </BlackContainer>
        </Main>
      </Layout>
    )
  }
}

export default StatsPage

const List = styled.ol`
  overflow: scroll;
  height: 50vh;
`
const ListItem = styled.li``
