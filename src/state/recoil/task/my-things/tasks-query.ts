import { atom } from 'recoil'

import { useGetMyTasksProperties } from 'src/components/Task/hooks/getTasks'

import { PREFIX } from '../constants'

export const myThingsTasksQuery = atom<useGetMyTasksProperties>({
  key: `${PREFIX}::MY_THINGS_QUERY`,
  default: {
    onlyUnchecked: false,
  },
})
