import React from 'react'
import styled from 'react-emotion'

const InputText_ = ({ value, onChange, ...props }) => (
  <input {...props} value={value} onChange={e => onChange(e.target.value)} />
)

export const InputText = styled(InputText_)`
  padding: 16px;
`
