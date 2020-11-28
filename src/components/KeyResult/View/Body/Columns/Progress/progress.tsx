import { Flex, Box, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import FormattedProgress from 'components/KeyResult/FormattedProgress'
import ProgressSlider from 'components/KeyResult/ProgressSlider'
import BaseGridItem from 'components/KeyResult/View/Body/Columns/Base'
import { KeyResult } from 'components/KeyResult/types'
import { buildPartialSelector } from 'state/recoil/key-result'

export interface ProgressProperties {
  id?: KeyResult['id']
}

const formatSelector = buildPartialSelector<KeyResult['format']>('format')
const progressReportsSelector = buildPartialSelector<KeyResult['progressReports']>(
  'progressReports',
)

const Progress = ({ id }: ProgressProperties): ReactElement => {
  const currentProgress = useRecoilValue(progressReportsSelector(id))?.[0]?.valueNew
  const format = useRecoilValue(formatSelector(id))

  const isKeyResultLoaded = Boolean(id)

  return (
    <BaseGridItem>
      <Flex flexDir="column" alignItems="flex-end">
        <Box w="100%">
          <Skeleton
            isLoaded={isKeyResultLoaded}
            fadeDuration={0}
            /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
          >
            <ProgressSlider id={id} />
          </Skeleton>
        </Box>

        <Skeleton
          noOfLines={1}
          minW="40%"
          mt={isKeyResultLoaded ? 'inherit' : '4px'}
          isLoaded={isKeyResultLoaded}
          fadeDuration={0}
          /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
        >
          <FormattedProgress
            progress={currentProgress}
            format={format}
            color="gray.300"
            textAlign="right"
          />
        </Skeleton>
      </Flex>
    </BaseGridItem>
  )
}

export default Progress
