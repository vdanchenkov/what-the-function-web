import React from 'react'
import styles from './styles.css'
import Editor from '../Editor'

export default ({onArgumentsChange, onResultChange}) => (
  <div className={styles.component}>
    <div>
      wtf({'{ lodash, ramda, Object }'})(
    </div>
    <div className={styles.editor}>
      <Editor wrap={s => `[${s}]`} onChange={onArgumentsChange}/>
    </div>
    <div>
      ).eql(
    </div>
    <div className={styles.editor}>
      <Editor onChange={onResultChange}/>
    </div>
    <div>
      )
    </div>
  </div>
)