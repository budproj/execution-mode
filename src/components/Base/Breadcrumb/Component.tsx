import { Box, styled } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import remove from 'lodash/remove'
import startCase from 'lodash/startCase'
import { indexOf } from 'lodash'
import { useIntl } from 'react-intl'

import messages from './messages'

import Button from 'components/Base/Button'
import Link from 'components/Base/Link'
import ArrowRightIcon from 'components/Icons/ArrowRight'

const StyledButton = styled(Button)({
  fontSize: 12,

  '& .MuiButton-iconSizeSmall > :first-child': {
    fontSize: 10,
    marginRight: 8,
  },
})

const StyledBox = styled(Box)({
  '& button:last-child': {
    fontWeight: 700,
  },

  '& button:first-child .MuiButton-startIcon': {
    display: 'none',
  },
})

const Breadcrumb = (): ReactElement => {
  const { pathname } = useRouter()
  const intl = useIntl()

  const stepTree = remove(['home', ...pathname.split('/')])

  return (
    <StyledBox display={'flex'}>
      {stepTree.map(
        (step, index, arr): ReactElement => (
          <Link key={`breadcrumb-${index}`} href={arr.slice(1, indexOf(arr, step) + 1).join('/')}>
            <StyledButton size={'small'} startIcon={<ArrowRightIcon />}>
              {messages[step] ? intl.formatMessage(messages[step]) : startCase(step)}
            </StyledButton>
          </Link>
        ),
      )}
    </StyledBox>
  )
}

export default Breadcrumb
