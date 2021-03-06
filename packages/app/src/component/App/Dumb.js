import React from 'react'
import styled from 'react-emotion'
import { Home } from '../_page/Home'
import { Safe } from '../_page/Safe'
import { ShareSafe } from '../_page/ShareSafe'
import { CreateSafe } from '../_page/CreateSafe'
import { CreateTransaction } from '../_page/CreateTransaction'

const FourOFour = ({ routerKey, ...props }) => (
  <div>
    <h1>{routerKey}</h1>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
)

const Content = ({ router, ...props }) => {
  switch (router.key) {
    case 'home':
      return <Home />

    case 'createSafe':
      return <CreateSafe />

    case 'shareSafe':
      return <ShareSafe />

    case 'safe':
      return <Safe />

    case 'createTransaction':
      return <CreateTransaction />

    case 'transaction':
    default:
      return <FourOFour routerKey={router.key} {...props} />
  }
}

type Props = {
  router: { key: string },
}

export const App = (props: Props) => (
  <Container>
    <Content {...props} />
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`
