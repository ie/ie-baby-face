import React, { Component } from 'react'
import Layout from '../components/layout'
import { db } from '../config/firebase'
import styled from 'styled-components'
import { graphql } from 'gatsby'

export const query = graphql`
  query ImagesQuery {
    dataJson {
      photos {
        name
        file
      }
    }
    allFile(
      filter: {
        extension: { regex: "/(jpeg|jpg|gif|png)/" }
        sourceInstanceName: { eq: "images" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth:2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

class Sync extends Component {
  constructor() {
    super()
    this.state = {
      synced: [],
      totalSynced: 0,
      syncing: false,
      isMounted: true,
    }
  }

  setStateFromSnapshot(snapshot) {
    snapshot.forEach(doc => {
      this.setState({
        synced: [...this.state.synced, doc.data()],
        totalSynced: this.state.totalSynced + 1,
      })
    })

    const files = this.props.data.allFile.edges
    const photos = this.props.data.dataJson.photos

    photos.forEach(photo => {
      // Already synced
      if (!this.state.synced.filter(doc => photo.name === doc.name).length) {
        const file = files.filter(f => {
          return f.node.childImageSharp.fluid.src.endsWith(photo.file)
        })[0]

        if (file) {
          const data = file.node.childImageSharp.fluid
          fetch(data.src)
            .then(response => response.blob())
            .then(blob => {
              const reader = new FileReader()
              reader.readAsDataURL(blob)
              reader.onloadend = function() {
                const encodedImage = reader.result
                db.collection('photos')
                  .add({
                    name: photo.name,
                    photo: encodedImage,
                  })
                  .then(() => {
                    this.setState({ totalSynced: this.state.totalSynced + 1 })
                  })
              }.bind(this)
            })
        }
      }
    })
  }

  componentDidMount() {
    this.setState({ syncing: true }, () => {
      db.collection('photos')
        .get()
        .then(snapshot => this.setStateFromSnapshot(snapshot))
    })
  }

  render() {
    return (
      <Layout>
        <h2>Total Synced: {this.state.totalSynced}</h2>
        <ImageGrid>
          {this.state.synced.map((photo, index) => {
            return <Image key={index} src={photo.photo} alt={photo.name} />
          })}
        </ImageGrid>
      </Layout>
    )
  }
}

export default Sync

const ImageGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  justify-items: center;
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
`
