import React from 'react'
import '!style!css!prismjs/themes/prism.css'
import styles from './styles.css'
import Prism from 'prismjs'
import docLinks from './docLinks'

export default ({ code }) => (
  <span className={styles.component} dangerouslySetInnerHTML={{ __html: docLinks(Prism.highlight(code, Prism.languages.javascript)) }} />
)
