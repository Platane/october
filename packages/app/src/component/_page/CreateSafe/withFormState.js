import React from 'react'
import styled from 'react-emotion'
import type { Safe } from '~/type'
import type { ComponentType } from 'react'

type Value = { name: string }

export const withFormState = (C: ComponentType<*>) =>
  class extends React.Component<*, { value: Value }> {
    state = { value: { name: '' } }

    onChange = (value: Value) => this.setState({ value })

    onSubmit = (e: Event) => {
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
