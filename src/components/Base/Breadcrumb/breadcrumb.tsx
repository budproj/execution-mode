import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem } from '@chakra-ui/react'
import { kebabCase } from 'lodash'
import remove from 'lodash/remove'
import startCase from 'lodash/startCase'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import IntlLink from 'src/components/Base/IntlLink'
import ArrowRightIcon from 'src/components/Icons/ArrowRight'

import messages, { BreadcrumbMessages } from './messages'

const Breadcrumb = (): ReactElement => {
  const { pathname } = useRouter()
  const intl = useIntl()

  const stepTree = remove(['home', ...pathname.split('/')])

  const isCurrentPage = (index: number): boolean => index === stepTree.length - 1

  return (
    <ChakraBreadcrumb
      spacing="12px"
      separator={
        <ArrowRightIcon
          desc={intl.formatMessage(messages.arrowRightIconDesc)}
          fill="gray.400"
          fontSize={10}
        />
      }
    >
      {stepTree.map(
        (step, index, array): ReactElement => (
          <BreadcrumbItem
            key={`breadcrumb-${kebabCase(step)}`}
            color={isCurrentPage(index) ? 'gray.600' : 'gray.400'}
            isCurrentPage={isCurrentPage(index)}
            fontWeight="500"
          >
            <IntlLink href={`/${array.slice(1, index + 1).join('/')}`}>
              {messages[step as BreadcrumbMessages]
                ? intl.formatMessage(messages[step as BreadcrumbMessages])
                : startCase(step)}
            </IntlLink>
          </BreadcrumbItem>
        ),
      )}
    </ChakraBreadcrumb>
  )
}

export default Breadcrumb
