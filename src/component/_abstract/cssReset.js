import { injectGlobal, hydrate } from 'react-emotion'
import React, { Component } from 'react'
import { black } from './palette'
import type { Component as ComponentType } from 'react'

export const injectReset = () => injectGlobal`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  h1,h2,h3,h4,p,span{
    line-height: 1.2;
    margin: 0;
  }

  html,
  body {
    height: 100%;
    position: relative;
    margin: 0;
  }

  html,
  button,
  input,
  textarea,
  body {
    color: ${black};
    font-family: Lato,Avenir Next,Helvetica Neue,sans-serif;
    letter-spacing: 0.04em;
  }
  `

export const withCssReset = (C: ComponentType<{}>) =>
  class WithCssReset extends Component<{}> {
    constructor() {
      super()
      injectReset()
    }

    render() {
      return <C {...this.props} />
    }
  }

export default withCssReset
