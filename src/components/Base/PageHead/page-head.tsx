import Head from 'next/head'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import defaultMessages from './messages'

export interface PageHeadProperties {
  title: MessageDescriptor
  description: MessageDescriptor
}

const PageHead = ({ title, description }: PageHeadProperties) => {
  const intl = useIntl()

  return (
    <Head>
      <title>{intl.formatMessage(title)}</title>
      <meta name="description" content={intl.formatMessage(description)} />
    </Head>
  )
}

PageHead.defaultProps = {
  title: defaultMessages.title,
  description: defaultMessages.description,
}

export default PageHead
