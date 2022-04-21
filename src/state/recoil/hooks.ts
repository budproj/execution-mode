import deepmerge from 'deepmerge'
import { Dispatch, SetStateAction, useState } from 'react'
import { RecoilState, useRecoilCallback } from 'recoil'

import { overwriteMerge } from 'lib/deepmerge/merge-strategies'
import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { Task } from 'src/components/Task/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

import { RecoilInterfaceCallback } from './types'

type RecoilEntity = Team | Objective | KeyResult | User | Cycle | Task
type RecoilEntityParameterKey = 'id'
type RecoilFamilyParameter = Team['id']
type RecoilFamily<E> = (parameter?: RecoilFamilyParameter) => RecoilState<Partial<E> | undefined>
type Loader<E> = (data?: Partial<E> | Array<Partial<E | undefined>> | undefined) => void | void[]
type Options = {
  isLoaded: boolean
}

type RecoilFamilyLoaderHook<E> = [Loader<E>, Options]

export function useRecoilFamilyLoader<E extends RecoilEntity>(
  family: RecoilFamily<E>,
  parameter: RecoilEntityParameterKey = 'id',
): RecoilFamilyLoaderHook<E> {
  const [isLoaded, setIsLoaded] = useState(false)

  const familyLoader = buildFamilyLoader(family, parameter, setIsLoaded)
  const loadOnRecoil = useRecoilCallback(familyLoader)

  const options = {
    isLoaded,
  }

  return [loadOnRecoil, options]
}

export const buildFamilyLoader =
  <E extends RecoilEntity>(
    family: RecoilFamily<E>,
    parameter: RecoilEntityParameterKey,
    setIsLoaded: Dispatch<SetStateAction<boolean>>,
  ) =>
  ({ snapshot, set }: RecoilInterfaceCallback) =>
  (data?: Partial<E> | Array<Partial<E | undefined>>) => {
    if (!data) return

    const loadOnRecoil = (singleData?: Partial<E>) => {
      setIsLoaded(true)
      if (!singleData) return

      const atom = family(singleData[parameter])
      const originalValue = snapshot.getLoadable(atom).getValue() ?? {}
      const newValue = deepmerge(originalValue, singleData, { arrayMerge: overwriteMerge })

      return set(atom, newValue as any)
    }

    return Array.isArray(data)
      ? data.map((singleData) => loadOnRecoil(singleData))
      : loadOnRecoil(data)
  }
