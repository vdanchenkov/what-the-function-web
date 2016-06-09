import React from 'react'
import Title from 'react-title-component'
import QueryPage from './QueryPage'
import styles from './styles.css'

export default React.createClass({
  render() {
    return (
      <div className={styles.component}>
        <Title render="What the Function"/>
        <QueryPage/>
      </div>
    )
  }
})

