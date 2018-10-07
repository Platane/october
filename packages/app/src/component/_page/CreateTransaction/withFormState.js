import React from 'react'
import styled from 'react-emotion'
import type { Date, ID } from '~/type'
import type { ComponentType } from 'react'

export type Value = {
  executedDate: Date,

  from: ID[],
  to: ID[],

  amount: number,

  message: string,
}

const validate = ({ amount, from }: Value) =>
  [
    //
    typeof amount !== 'number' && 'Set the amount',

    from.length === 0 && 'Add at least one source',

    to.length === 0 && 'Add at least one receiver',
  ].fillter(Boolean)

export const withFormState = (C: ComponentType<*>) =>
  class extends React.Component<*, { value: Value }> {
    state = {
      value: {
        message: '',
        amount: '',
        from: [],
        to: [],
        executedDate: Date.now(),
      },
    }

    onChange = (value: Value) => this.setState({ value })

    onSubmit = (e: Event) => {
      e.preventDefault()
      this.props.createTransaction(
        this.state.value.message,
        this.state.value.amount,
        this.state.value.from,
        this.state.value.to,
        this.state.value.executedDate
      )
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
