import { Box, Flex, StyleProps } from '@chakra-ui/react'
import React, { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useResetRecoilState, useSetRecoilState } from 'recoil'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { krHealthStatusAtom } from 'src/state/recoil/key-result'
import { isKeyResultListOpenAtom } from 'src/state/recoil/key-result/key-result-list'
import { krTableLengthAtom } from 'src/state/recoil/key-result/kr-table-lenght.atom'

import Board from '../Board'
import StackedProgressBar from '../StackedProgressBar'
import { confidenceTexts, getConfidenceQuantities, getIsListable } from '../constants'
import messages from '../messages'
import { Confidence, HealthConfidenceQuantites } from '../types'

export interface KeyResultConfidencesProperties extends StyleProps {
  quantities: HealthConfidenceQuantites
  isLoading?: boolean
}

const KeyResultConfidences = ({
  quantities,
  isLoading,
  ...rest
}: KeyResultConfidencesProperties) => {
  const intl = useIntl()
  const setKrHealthStatus = useSetRecoilState(krHealthStatusAtom)
  const setKrTableLength = useSetRecoilState(krTableLengthAtom)
  const resetListKR = useResetRecoilState(isKeyResultListOpenAtom)

  const confidencesToRender = useMemo(
    () =>
      confidenceTexts
        .map(getConfidenceQuantities(quantities))
        .map((confidence) => getIsListable(confidence)),
    [quantities],
  )

  const onClick = useCallback(
    (confidence: Confidence) => {
      if (confidence.isListable) {
        setKrTableLength(quantities[confidence.name])
        setKrHealthStatus(confidence.name)
        resetListKR()
      }
    },
    [quantities, setKrHealthStatus, setKrTableLength, resetListKR],
  )

  return (
    <Flex borderRadius="9px" bg="white" width="100%" paddingY={15} paddingX={18} {...rest}>
      {/* <Board
        isLoading={isLoading}
        title={intl.formatMessage(messages.keyResultsTitle)}
        number={quantities?.keyResultsQuantity}
        bg="new-gray.300"
        bgHover="new-gray.300"
        minWidth="175px"
        size="lg"
      /> */}
      <Box w="100%">
        <Flex justifyContent="space-between" gridGap="24px">
          {confidencesToRender.map((confidence) => {
            return (
              <TooltipWithDelay
                key={confidence.name}
                isDisabled={confidence.isListable}
                label={intl.formatMessage(
                  messages[
                    confidence.name === 'high'
                      ? 'highConfidenceTooltip'
                      : 'confidenceWithoutKeyResultsTooltip'
                  ],
                )}
              >
                <Box flex="1">
                  <Board
                    uppercase
                    isLoading={isLoading}
                    title={intl.formatMessage(messages[`${confidence.name}`])}
                    color={confidence.color}
                    number={confidence.quantity}
                    bgColor={confidence.bg}
                    bgHover={confidence.bgHover}
                    paddingX={30}
                    confidence={confidence}
                    cursor={confidence.isListable ? 'pointer' : 'default'}
                    onClick={() => onClick(confidence)}
                  />
                </Box>
              </TooltipWithDelay>
            )
          })}
        </Flex>
        <StackedProgressBar
          isLoading={isLoading}
          total={quantities?.keyResultsQuantity}
          confidences={confidenceTexts}
          quantities={quantities}
        />
      </Box>
    </Flex>
  )
}

export default KeyResultConfidences
