import React, { Fragment, ReactElement } from 'react'

import Link from 'components/Base/Link'

const Foo = (): ReactElement => (
  <Fragment>
    <Link href={'keyResults'}>
      <p>Ir para Key Results</p>
    </Link>
  </Fragment>
)

export default Foo
