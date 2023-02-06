import { cssVar, defineStyle, defineStyleConfig } from '@chakra-ui/react'

const $startColor = cssVar('skeleton-start-color')
const $endColor = cssVar('skeleton-end-color')

const style = defineStyle({
  [$startColor.variable]: 'colors.black.100',
  [$endColor.variable]: 'colors.black.50',
})
const Skeleton = defineStyleConfig({
  variants: { style },
  defaultProps: {
    variant: 'style',
  },
})

export default Skeleton
