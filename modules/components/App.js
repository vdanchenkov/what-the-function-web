import React from 'react'
import Title from 'react-title-component'
import QueryPage from './QueryPage'
import styles from './../styles.css'

export default React.createClass({
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Title render="What the Function"/>
        <QueryPage/>
      </div>
    )
  }
})

