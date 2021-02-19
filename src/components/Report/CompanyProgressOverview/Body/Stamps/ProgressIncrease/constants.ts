import ArrowDownIcon from 'src/components/Icon/ArrowDown'
import ArrowUpIcon from 'src/components/Icon/ArrowUp'
import LineIcon from 'src/components/Icon/Line'
import { SIGNAL } from 'src/state/hooks/useValueSignal/constants'

import messages from './messages'

export const ICON_COMPONENT_HASHMAP = {
  [SIGNAL.POSITIVE]: ArrowUpIcon,
  [SIGNAL.NEGATIVE]: ArrowDownIcon,
  [SIGNAL.NEUTRAL]: LineIcon,
}

export const ICON_DESC_HASHMAP = {
  [SIGNAL.POSITIVE]: messages.arrowUpIconDesc,
  [SIGNAL.NEGATIVE]: messages.arrowDownIconDesc,
  [SIGNAL.NEUTRAL]: messages.lineIconDesc,
}
