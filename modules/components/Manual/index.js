import React from 'react'
import { component, header, content } from './styles.css'

export default () => (
  <div className={component}>
    <div className={header}>
      What The Function
    </div>
    <div className={content}>
      Provide function arguments and expected result.
      I will try to find appropriate functions.
      I will try to permutate first 3 arguments.
      Permutation of remaining arguments disabled for performance reasons.
    </div>
  </div>
)