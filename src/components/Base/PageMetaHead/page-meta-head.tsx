import Head from 'next/head'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import defaultMessages from './messages'

type MessageFormatPrimitiveValue = string | number | boolean | null | undefined

export interface PageMetaHeadProperties {
  title: MessageDescriptor
  description: MessageDescriptor
  titleValues?: Record<string, MessageFormatPrimitiveValue>
}

const PageMetaHead = ({ title, description, titleValues }: PageMetaHeadProperties) => {
  const intl = useIntl()

  return (
    <Head>
      <title>{intl.formatMessage(title, titleValues)}</title>
      <meta name="description" content={intl.formatMessage(description)} />
    </Head>
  )
}

PageMetaHead.defaultProps = {
  title: defaultMessages.title,
  description: defaultMessages.description,
}

export default PageMetaHead
