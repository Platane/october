import React from 'react'
import styled from 'react-emotion'
import { MultiSelect } from '~/component/Input/MultiSelect'
import { InputText } from '~/component/Input/InputText'
import { Button } from '~/component/Button'
import type { Value } from './withFormState'

type Props = {
  value: Value,
  onChange: (transaction: Value) => void,
  onSubmit: () => void,
}

export const CreateTransaction = ({
  value,
  onChange,
  users,
  onSubmit,
}: Props) => (
  <Container>
    <h1>Create transaction</h1>

    <form onSubmit={onSubmit}>
      <InputText
        type="text"
        placeholder="message"
        value={value.message}
        onChange={message => onChange({ ...value, message })}
      />

      <InputText
        type="number"
        step="1"
        placeholder="amount"
        value={value.amount}
        onChange={amount => onChange({ ...value, amount: +amount })}
      />

      <MultiSelect
        placeholder="source name"
        value={value.from
          .map(id => users.find(u => u.id === id))
          .filter(Boolean)}
        options={users}
        onChange={from => onChange({ ...value, from: from.map(u => u.id) })}
      />

      <MultiSelect
        placeholder="receiver name"
        value={value.to.map(id => users.find(u => u.id === id)).filter(Boolean)}
        options={users}
        onChange={to => onChange({ ...value, to: to.map(u => u.id) })}
      />

      <Button type="submit">submit</Button>
    </form>
  </Container>
)

const Container = styled.div``
