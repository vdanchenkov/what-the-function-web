import React from 'react'
import { timeout } from './../../constants'

const component = {
  fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`
}

const header = {
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginBottom: '0.2rem',
  textAlign: 'center'
}

const p = {
  margin: 0,
  marginBottom: '1rem'
}

export default () => (
  <div css={component}>
    <div css={header}>
      What The Function
    </div>
    <div>
      <p css={p}>
        Provide function arguments and expected result to get list of suitable functions.
      </p>
      <p>
        Three initial arguments will be permuted.
        In case function execution takes more then { timeout } ms, it will be skipped.
      </p>
    </div>
  </div>
)
