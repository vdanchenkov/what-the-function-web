import React from 'react'
import { component, header, content } from './styles.css'
import { timeout } from './../../constants'

export default () => (
  <div className={component}>
    <div className={header}>
      What The Function
    </div>
    <div className={content}>
      <p>
        Provide function arguments and expected result to get list of suitable functions.
      </p>
      <p>
        Three initial arguments will be permuted.
        In case function execution takes more then { timeout } ms, it will be skipped.
      </p>
    </div>
  </div>
)