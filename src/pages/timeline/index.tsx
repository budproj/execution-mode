import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { Timeline } from 'src/components/Page/Timeline'
import { useGetConfiguration } from 'src/components/Settings/hooks'

const TimelinePage = () => {
  const { push } = useRouter()

  const { isTimelineEnabled } = useGetConfiguration()

  useEffect(() => {
    if (!isTimelineEnabled) {
      push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Timeline />
}

export default TimelinePage
