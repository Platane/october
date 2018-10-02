import React from 'react'
import styled from 'react-emotion'
import type { Safe } from '~/type'

export const withFormState = C =>
  class extends React.Component {
    state = { value: { name: '' } }
    onChange = value => this.setState({ value })
    onSubmit = e => {
      e.preventDefault()
      this.props.createSafe(this.state.value.name)
    }
    render() {
      return (
        <C
          {...this.props}
          {...this.state}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      )
    }
  }
