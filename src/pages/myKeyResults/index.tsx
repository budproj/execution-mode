import React, { ReactElement } from 'react'

import withIntlProxy from 'hocs/withIntlProxy'

const MyKeyResultsIndex = (): ReactElement => <p>You are at: "My Key Results"</p>

export default withIntlProxy(MyKeyResultsIndex, '/myKeyResults')
