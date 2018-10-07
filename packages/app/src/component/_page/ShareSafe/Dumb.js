import React from 'react'
import styled from 'react-emotion'
import { Link } from '~/component/Link'

type Props = { shareUrl: string }

export const ShareSafe = ({ shareUrl }: Props) => (
  <Container>
    <h1>Safe Share</h1>

    <Link href={shareUrl}>{shareUrl}</Link>
  </Container>
)

const Container = styled.div``
