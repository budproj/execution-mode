import { Stack } from '@chakra-ui/react'
import React from 'react'

import PieChartWithNeedle from 'src/components/Base/Charts/pie-chart-with-needle'
import { useGetEmoji } from 'src/components/Routine/hooks'

const BestPracticesLighthouse = () => {
  const { getEmoji } = useGetEmoji()
  const score = 1

  return (
    <Stack position="relative">
      <PieChartWithNeedle />
      {/* <RadialChartComponent
        size="xl"
        data={score}
        type="lighthouse"
        icon={getEmoji({
          felling: score,
          size: '72px',
        })}
        numberColor="#ffc658"
        progressColor="#ffc658"
        title="Boas Práticas"
      /> */}
    </Stack>
  )
}

export default BestPracticesLighthouse
