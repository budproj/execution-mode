import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

import Button from 'components/Base/Button'
import Link from 'components/Base/Link'

export interface ToolbarMenuItemProps {
  label: string
  href: string
}

const ToolbarMenuItem = (props: ToolbarMenuItemProps): ReactElement => {
  const router = useRouter()
  const isHrefCurrentRoute = router.pathname === props.href

  return (
    <Link href={props.href}>
      <Button isActive={isHrefCurrentRoute}>{props.label}</Button>
    </Link>
  )
}

export default ToolbarMenuItem
