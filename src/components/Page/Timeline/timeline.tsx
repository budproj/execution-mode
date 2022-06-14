import React from 'react'

import { PageContent, PageMetaHead } from 'src/components/Base'

import messages from './messages'

export const Timeline = () => (
  <PageContent>
    <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />
    <iframe
      style={{ height: '100vh' }}
      src="https://coda.io/embed/ep7fzzsAJg/_sukdv?viewMode=embedplay"
    />
  </PageContent>
)
