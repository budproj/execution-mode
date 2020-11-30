import { Text, TextProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import { KeyResultFormat, ProgressReport } from 'src/components/KeyResult/types'

import { buildFormatNumberOptionsBasedOnFormat } from './builder'

export interface FormattedProgressProperties extends TextProps {
  format?: KeyResultFormat
  progress?: ProgressReport['valueNew']
}

const FormattedProgress = ({
  progress,
  format,
  ...rest
}: FormattedProgressProperties): ReactElement => {
  const intl = useIntl()
  const options = buildFormatNumberOptionsBasedOnFormat(format)

  return <Text {...rest}>{intl.formatNumber(progress, options)}</Text>
}

FormattedProgress.defaultProps = {
  progress: 0,
}

export default FormattedProgress
