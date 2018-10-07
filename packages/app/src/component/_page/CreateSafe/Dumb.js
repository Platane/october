import React from 'react'
import styled from 'react-emotion'
import { InputText } from '~/component/Input/InputText'
import { Button } from '~/component/Button'

const Input = ({ value, onChange, ...props }) => (
  <input {...props} value={value} onChange={e => onChange(e.target.value)} />
)

type Props = {
  value: { name: string },
  onChange: (safe: { name: string }) => void,
  onSubmit: () => void,
}

export const CreateSafe = ({ value, onChange, onSubmit }: Props) => (
  <Container>
    <h1>Create safe</h1>

    <form onSubmit={onSubmit}>
      <InputText
        type="text"
        placeholder="safe name"
        value={value.name}
        onChange={name => onChange({ ...value, name })}
      />

      <Button type="submit">submit</Button>
    </form>
  </Container>
)

const Container = styled.div``
