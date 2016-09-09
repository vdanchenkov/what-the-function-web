import React from 'react'
import Title from 'react-title-component'
import QueryPage from './QueryPage'
import { insertRule } from 'glamor' 

export default React.createClass({
  render() {
    return (
      <div css={css}>
        <Title render="What the Function"/>
        <QueryPage/>
      </div>
    )
  }
})

const css = {
  display: 'flex',
  justifyContent: 'center'
}

insertRule('body { color: #333, font-size: 16px }')
