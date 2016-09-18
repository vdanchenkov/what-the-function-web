import 'babel-polyfill'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { plugins } from 'glamor'

if (process.env.NODE_ENV == 'development') {
  const extractToComment = require('glamor-plugin-extract-to-comment').default
  const detectComponent = require('glamor-plugin-detect-component').default

  plugins.add(extractToComment('GlamorComponent', true))
  plugins.add(detectComponent())
}
const App = require('./components/App').default

const rootEl = document.createElement('div')
document.body.appendChild(rootEl)

ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootEl
)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./components/App').default
    ReactDOM.render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        rootEl
    )
  })
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga')

ga('create', 'UA-83722336-1', 'auto')
ga('send', 'pageview')
