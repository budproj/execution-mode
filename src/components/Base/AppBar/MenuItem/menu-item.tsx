import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

export interface MenuItemProperties {
  label: string
  href: string
}

const MenuItem = (properties: MenuItemProperties): ReactElement => {
  const router = useRouter()
  const isHrefCurrentRoute = router.pathname === properties.href

  return (
    <Link href={properties.href}>
      <Button variant="text" isActive={isHrefCurrentRoute}>
        {properties.label}
      </Button>
    </Link>
  )
}

export default MenuItem
