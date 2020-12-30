import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem } from '@chakra-ui/react'
import { kebabCase } from 'lodash'
import remove from 'lodash/remove'
import startCase from 'lodash/startCase'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import IntlLink from 'src/components/Base/IntlLink'
import ArrowRightIcon from 'src/components/Icon/ArrowRight'

import messages, { BreadcrumbMessages } from './messages'

export interface BreadcrumbProperties {
  routeParams?: Record<string, string>
}

const Breadcrumb = ({ routeParams }: BreadcrumbProperties) => {
  const { pathname } = useRouter()
  const intl = useIntl()

  const stepTree = remove(['home', ...pathname.split('/')])
  const isCurrentPage = (index: number): boolean => index === stepTree.length - 1
  const buildDynamicStepName = (step: string) => {
    const key = step.slice(1, -1)
    const stepParameter = routeParams?.[key]
    const stepName = stepParameter ? stepParameter : key
    const normalizedStepName = startCase(stepName)

    return normalizedStepName
  }

  const buildStepName = (step: string) => {
    const normalizedStepName = startCase(step)
    const hasIntlMessage = step in messages
    const isDynamicStep = step.startsWith('[')
    const fallbackStepName = isDynamicStep ? buildDynamicStepName(step) : normalizedStepName

    const stepName = hasIntlMessage
      ? intl.formatMessage(messages[step as BreadcrumbMessages])
      : fallbackStepName

    return stepName
  }

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
              {buildStepName(step)}
            </IntlLink>
          </BreadcrumbItem>
        ),
      )}
    </ChakraBreadcrumb>
  )
}

export default Breadcrumb
