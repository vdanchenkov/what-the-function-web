import React from 'react'
import { IndexLink, Link } from 'react-router'
import Title from 'react-title-component'

export default React.createClass({
  render() {
    return (
      <div>
        <Title render="What the Function"/>
        <h1>What the Function</h1>
        <ul>
          <li><IndexLink to="/">Home</IndexLink></li>
          <li><Link to="/dragon">A DRAGON!</Link></li>
          <li><Link to="/not-dragon">An old URL to a DRAGON!</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

