import { Dispatch, SetStateAction, useState } from 'react'
import { useIntl } from 'react-intl'

import { CADENCE } from 'src/components/Cycle/constants'

import messages from './messages'

type Cadence = {
  prefix: string | undefined
}

type CadenceHook = [Cadence, Dispatch<SetStateAction<CADENCE | undefined>>, CADENCE | undefined]

const useCadence = (initialValue?: CADENCE): CadenceHook => {
  const [cadenceValue, setCadenceValue] = useState(initialValue)
  const intl = useIntl()

  const cadencePrefixMessageDescriptorHashmap = {
    [CADENCE.YEARLY]: messages.yearlyPrefix,
    [CADENCE.QUARTERLY]: messages.quarterlyPrefix,
  }

  const cadencePrefixMessageDescriptor = cadenceValue
    ? cadencePrefixMessageDescriptorHashmap[cadenceValue]
    : undefined
  const cadencePrefix = cadencePrefixMessageDescriptor
    ? intl.formatMessage(cadencePrefixMessageDescriptor)
    : undefined

  const cadence = {
    prefix: cadencePrefix,
  }

  return [cadence, setCadenceValue, cadenceValue]
}

export default useCadence
