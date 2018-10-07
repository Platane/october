import React from 'react'
import styled from 'react-emotion'
import { Link } from '~/component/Link'
import type { Safe as SafeType } from '~/type'

type Props = { safe: SafeType }

export const Safe = ({ safe }: Props) =>
  safe && (
    <Container>
      <h1>Safe {safe.name}</h1>

      <Link href={`/safe/${safe.id}/share`}>share</Link>

      <List>
        {safe.transactions.map(transaction => (
          <Item key={transaction.id}>{transaction.message}</Item>
        ))}
      </List>

      <Link href={`/safe/${safe.id}/transaction/create`} replace>
        <AddButton />
      </Link>
    </Container>
  )

const Container = styled.div``
const List = styled.div`
  display: flex;
  flex-direction: column;
`
const Item = styled.div`
  padding: 16px;
`
const AddButton = styled.button`
  padding: 16px;
  &:after {
    content: '+';
  }
`
