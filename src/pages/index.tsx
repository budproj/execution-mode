import React, { ReactElement } from 'react'

import { withIntlRedirect } from 'components/hocs'

const Index = (): ReactElement => <>Home</>

export default withIntlRedirect(Index, 'key-results')
