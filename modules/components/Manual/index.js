import React from 'react'
import { style } from 'glamor'
import { timeout } from './../../constants'

const component = style({
  fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`
})

const header = style({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginBottom: '0.2rem',
  textAlign: 'center'
})

const p = style({
  margin: 0,
  marginBottom: '1rem'
})

export default () => (
  <div {...component}>
    <div {...header}>
      What The Function
    </div>
    <div>
      <p {...p}>
        Provide function arguments and expected result to get list of suitable functions.
      </p>
      <p>
        Three initial arguments will be permuted.
        In case function execution takes more then { timeout } ms, it will be skipped.
      </p>
    </div>
  </div>
)
