import React from 'react'
import Title from 'react-title-component'
import Manual from './Manual'
import QueryPage from './QueryPage'
import { insertRule } from 'glamor' 

export default React.createClass({
  render() {
    return (
      <div css={css}>
        <Title render="What the Function"/>
        <Manual/>
        <QueryPage/>
      </div>
    )
  }
})

const css = {
  width: 600,
  margin: '0 auto'
}

insertRule('body { color: #333, font-size: 16px }')
