import React, { ReactElement } from 'react'

import Link from 'components/Base/Link'

const MyKeyResultsIndex = (): ReactElement => (
  <p>
    You are at: "My Key Results". Go to <Link href={'/foo'}>foo</Link>
  </p>
)

export default MyKeyResultsIndex
