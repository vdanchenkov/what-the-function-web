import React from 'react'
import styles from './styles.css'

const links = {
  lodash: 'http://devdocs.io/lodash~4/index#%s',
  ramda: 'http://devdocs.io/ramda/index#%s',
  Object: 'http://devdocs.io/javascript/global_objects/object/%s'
}

export default ({module, func, children}) => (
  links[module] ?
    <a className={styles.component} target="_blank" href={links[module].replace('%s', func)}>{children}</a> :
    <span className={styles.component}>{children}</span>
  )