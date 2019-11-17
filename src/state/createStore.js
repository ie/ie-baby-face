import { createStore as reduxCreateStore } from 'redux'

const reducer = (state, action) => {
  if (action.type === `REGISTER`) {
    return Object.assign({}, state, {
      name: action.name,
    })
  }

  if (action.type === `DOCUMENT_SAVE`) {
    return Object.assign({}, state, {
      documentId: action.documentId,
    })
  }

  return state
}

const initialState = { name: '' }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
