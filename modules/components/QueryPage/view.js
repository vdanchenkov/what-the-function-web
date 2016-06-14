import React from 'react'
import styles from './styles.css'
import Query from '../Query'
import Editor from '../Editor'
import Manual from '../Manual'
import Suggestions from '../Suggestions'

export default ({ onArgumentsChange, onResultChange, suggestions = [], loading }) => {
  return (
      <div className={styles.component}>
        <Manual/>
        <Query {...{onArgumentsChange, onResultChange}} />
        <Suggestions {...{suggestions, loading}}/>
      </div>
  )
}
