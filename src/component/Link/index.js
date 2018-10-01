import { connect } from 'react-redux'
import React from 'react'
import styled from 'react-emotion'

import { goTo } from '~/store/action/router'

type Props = {
  href: string,
  goTo: (pathname: string, query?: Object, hash?: Object) => void,
  replace?: boolean,
  children: *,
}

const DumbLink = ({ href, goTo, children, replace, ...props }: Props) => (
  <A
    {...props}
    href={href}
    onClick={e => {
      e.preventDefault()
      goTo(href)
    }}
  >
    {children}
  </A>
)

const A = styled.a`
  color: inherit;
  text-decoration: none;
`

export const Link = connect(
  null,
  { goTo }
)(DumbLink)
