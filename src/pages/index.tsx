import React, { Fragment, ReactElement } from 'react'

import withRedirect from 'hocs/withRedirect'

const Index = (): ReactElement => <Fragment />

export default withRedirect(Index, '/myKeyResults')
