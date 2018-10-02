import React from 'react'
import styled from 'react-emotion'
import type { Safe } from '~/type'

const Input = ({ value, onChange, ...props }) => (
  <input {...props} value={value} onChange={e => onChange(e.target.value)} />
)

export const CreateSafe = ({ value, onChange, onSubmit }) => (
  <Container>
    <h1>Create safe</h1>

    <form onSubmit={onSubmit}>
      <InputForm
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
const InputForm = styled(Input)`
  padding: 16px;
`
const Button = styled.button`
  padding: 16px;
`
