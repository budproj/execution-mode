import Head from 'next/head'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import defaultMessages from './messages'

type MessageFormatPrimitiveValue = string | number | boolean | null | undefined

export interface PageHeadProperties {
  title: MessageDescriptor
  description: MessageDescriptor
  titleValues?: Record<string, MessageFormatPrimitiveValue>
}

const PageHead = ({ title, description, titleValues }: PageHeadProperties) => {
  const intl = useIntl()

  return (
    <Head>
      <title>{intl.formatMessage(title, titleValues)}</title>
      <meta name="description" content={intl.formatMessage(description)} />
    </Head>
  )
}

PageHead.defaultProps = {
  title: defaultMessages.title,
  description: defaultMessages.description,
}

export default PageHead
