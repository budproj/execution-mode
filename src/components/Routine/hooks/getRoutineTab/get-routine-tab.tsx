import { useIntl } from 'react-intl'

import routineTabMessages from 'src/components/Page/Team/messages'

export const useRoutineTab = () => {
  const intl = useIntl()
  const routineTabName = intl.formatMessage(routineTabMessages.retrospectiveTeamTab)

  return routineTabName.toLocaleLowerCase()
}
