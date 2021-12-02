// CSS
import { BlackContainer, WhiteContainer } from '../styles/global'
import React, { Component } from 'react'

import Heading from '../components/heading'
// Components
import Layout from '../components/layout'
import Main from '../components/main'
import Moustache from '../components/moustache'
import Preloader from '../components/preloader'
import { db } from '../config/firebase'
import styled from 'styled-components'

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
          photos: [...prevState.photos, { id: doc.id, name: doc.data().name, photo: doc.data().photo }],
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

      const matchedPhotos = this.state.photos.map(pic => {
        const correctMatches = this.state.guesses.reduce((data, g) => {
          const guesser = g.name;
          const sumCorrect = g.guesses.filter(guess => {
            return guess.photo === pic.id && guess.name === pic.name;
          });
          const matches = data.matches + sumCorrect.length;
          const sumTotalGuesses = sumCorrect.length > 0 ? [...data.correctGuesses, guesser] : data.correctGuesses;
          return {matches, correctGuesses: sumTotalGuesses};
        }, {matches: 0, correctGuesses: []} );
        return {...pic, ...correctMatches};
      });

      this.setState(prevState => {
        return { guesses: filteredGuesses, photos: matchedPhotos, loaded: true, loading: false }
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

  sortMatches(a, b) {
    return b.matches - a.matches
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
            <List>
              {this.state.loaded &&
                this.state.photos
                  .filter(photo => photo.matches > 0)
                  .sort(this.sortMatches)
                  .map((photo, index) => {
                    return (
                      <ListItem key={index}>
                        Photo of: {photo.name}
                        <Image src={photo.photo} /> <br />
                        Correct Guesses: {photo.matches}
                        Guessers: <br/> {photo.correctGuesses.map((name, index) => { 
                          return (<Guesser>{name}&nbsp;</Guesser> ) }
                        )}
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

const Image = styled.img`
  display: block;
  height: inherit !important;
  margin: 0 auto;
  max-height: 10vh;
  max-width: 10vw;
  width: auto;
`
const Guesser = styled.span`
  font-size: 8px;
`