import React, { Fragment, ReactElement } from 'react'

import { withIntlRedirect } from 'hocs'

const Index = (): ReactElement => <>Home</>

export default withIntlRedirect(Index, 'key-results')
