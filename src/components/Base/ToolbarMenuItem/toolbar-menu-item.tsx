import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

import Button from 'components/Base/Button'
import IntlLink from 'components/Base/IntlLink'

export interface ToolbarMenuItemProperties {
  label: string
  href: string
}

const ToolbarMenuItem = (properties: ToolbarMenuItemProperties): ReactElement => {
  const router = useRouter()
  const isHrefCurrentRoute = router.pathname === properties.href

  return (
    <IntlLink href={properties.href}>
      <Button isActive={isHrefCurrentRoute}>{properties.label}</Button>
    </IntlLink>
  )
}

export default ToolbarMenuItem
