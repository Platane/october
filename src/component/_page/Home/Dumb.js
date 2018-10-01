import React from 'react'
import styled from 'react-emotion'
import { Link } from '~/component/Link'
import type { Safe } from '~/type'

export const Home = ({ safes }: { safes: Safe[] }) => (
  <Container>
    <h1>Safe list</h1>

    <List>
      {safes.map(safe => (
        <Link key={safe.id} href={`/safe/${safe.id}`}>
          <Item>{safe.id}</Item>
        </Link>
      ))}
    </List>

    <Link href="/safe/create" replace>
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
