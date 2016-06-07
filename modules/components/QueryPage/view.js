import React from 'react'
import styles from './styles.css'
import Editor from '../Editor'

export default ({ onArgumentsChange, onResultChange, suggestions = [] }) => {
  return (
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
        {
          suggestions.map(({ library, name, args, argsOrder }) => (
              <div key={library + name + argsOrder}>
                {library}.
                {name}
                ({argsOrder.map(index => String.fromCharCode('a'.charCodeAt() + index)).join(', ')})
              </div>
          ))
        }
      </div>
  )
}
