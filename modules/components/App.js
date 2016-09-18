import React from 'react'
import Title from 'react-title-component'
import QueryPage from './QueryPage'
import { insertRule } from 'glamor' 

const App = () => (
  <div css={css}>
    <Title render="What the Function"/>
    <QueryPage/>
  </div>
)

const css = {
  width: 600,
  margin: '0 auto',
  fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`
}

insertRule('body { color: #333; font-size: 16px }')
insertRule(`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }`)

export default App
