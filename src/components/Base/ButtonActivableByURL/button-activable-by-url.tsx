import { Button, ButtonProps } from '@chakra-ui/react'
import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export interface ButtonActivableByURLProperties extends ButtonProps {
  href?: LinkProps['href']
}

const ButtonActivableByURL = ({ href, ...rest }: ButtonActivableByURLProperties) => {
  const router = useRouter()
  const isHrefCurrentRoute = router.pathname === href

  return <Button isActive={isHrefCurrentRoute} {...rest} />
}

export default ButtonActivableByURL
