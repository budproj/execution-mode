import { Box } from '@chakra-ui/layout'
import { Heading, Skeleton } from '@chakra-ui/react'
import React from 'react'

import buildSkeletonMinSize from '../../../../../../lib/chakra/build-skeleton-min-size'
import { AccordionEntryMode } from '../../../../../state/recoil/objective/accordion'
import { Objective } from '../../../types'

interface TitleBoxModeProperties {
  isLoaded?: boolean
  objective?: Partial<Objective>
}

interface TitleBoxProperties extends TitleBoxModeProperties {
  mode: AccordionEntryMode
}

const ViewModeTitleBox = ({ isLoaded, objective }: TitleBoxModeProperties) => (
  <Skeleton
    isLoaded={isLoaded}
    {...buildSkeletonMinSize(isLoaded ?? true, 300, 24, {
      loadedWidth: 'auto',
    })}
  >
    <Heading as="h4" fontSize="xl" fontWeight={400} textAlign="left" color="black.900">
      {objective?.title}
    </Heading>
  </Skeleton>
)

const EditModeTitleBox = (properties: TitleBoxModeProperties) => <p>Edit title</p>

export const TitleBox = ({ mode, ...rest }: TitleBoxProperties) => (
  <Box flexGrow={1}>
    {mode === AccordionEntryMode.EDIT ? (
      <EditModeTitleBox {...rest} />
    ) : (
      <ViewModeTitleBox {...rest} />
    )}
  </Box>
)
