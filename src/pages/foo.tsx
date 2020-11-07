import React, { Fragment, ReactElement } from 'react'

import IntlLink from 'components/Base/IntlLink'

const Foo = (): ReactElement => (
  <Fragment>
    <IntlLink href={'keyResults'}>
      <p>Ir para Key Results</p>
    </IntlLink>
  </Fragment>
)

export default Foo
