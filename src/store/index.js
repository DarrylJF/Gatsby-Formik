import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import combinedReducer from './reducers'

// Create store from the combination of our reducers
export default createStore(
    combinedReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
)
