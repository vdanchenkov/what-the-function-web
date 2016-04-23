//import '../modules/styles.css'
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import QueryPage from './components/QueryPage'
import NoMatch from './components/NoMatch'

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={QueryPage}/>
    </Route>
    <Route path="*" status={404} component={NoMatch}/>
  </Route>
)
