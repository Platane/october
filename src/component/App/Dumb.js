import React from 'react'
import styled from 'react-emotion'

const FourOFour = ({ routerKey, ...props }) => (
  <div>
    <h1>{routerKey}</h1>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
)

const Content = ({ router, ...props }) => {
  switch (router.key) {
    case 'home':
    case 'createSafe':
    case 'safe':
    case 'createTransaction':
    case 'transaction':
    default:
      return <FourOFour routerKey={router.key} {...props} />
  }
}

export const App = props => (
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
