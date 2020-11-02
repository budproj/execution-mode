import React, { ReactElement } from 'react'

import Link from 'components/Base/Link'

const Foo = (): ReactElement => (
  <div>
    Este é um teste. <Link href={'/keyResults'}>Clique aqui</Link>
  </div>
)

export default Foo
