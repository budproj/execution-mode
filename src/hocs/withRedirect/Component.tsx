import React, { ComponentType, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { NextComponentType, NextPageContext } from 'next'

import isBrowser from 'specifications/isBrowser'

const withRedirect = (WrappedComponent: NextComponentType, location: string): ComponentType => {
  const WithRedirectWrapper = (props: Record<string, unknown>): ReactElement => {
    const router = useRouter()

    if (isBrowser()) {
      router.push(location)
      return <></>
    }

    return <WrappedComponent {...props} />
  }

  WithRedirectWrapper.getInitialProps = async (
    ctx: NextPageContext,
  ): Promise<Record<string, unknown> | undefined> => {
    if (!isBrowser() && ctx.res && !ctx.res.headersSent) {
      ctx.res.writeHead(302, { Location: location })
      ctx.res.end()
    }

    const props = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))

    return { ...props }
  }

  return WithRedirectWrapper
}

export default withRedirect
