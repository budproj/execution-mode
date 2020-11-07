import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

import Button from 'components/Base/Button'
import IntlLink from 'components/Base/IntlLink'

export interface ToolbarMenuItemProps {
  label: string
  href: string
}

const ToolbarMenuItem = (props: ToolbarMenuItemProps): ReactElement => {
  const router = useRouter()
  const isHrefCurrentRoute = router.pathname === props.href

  return (
    <IntlLink href={props.href}>
      <Button isActive={isHrefCurrentRoute}>{props.label}</Button>
    </IntlLink>
  )
}

export default ToolbarMenuItem
