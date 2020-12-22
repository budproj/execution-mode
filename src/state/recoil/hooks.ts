import deepmerge from 'deepmerge'
import { RecoilState, useRecoilCallback } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'

import { RecoilInterfaceCallback } from './types'

type RecoilEntity = Partial<Team> | Partial<Objective> | Partial<KeyResult> | undefined
type RecoilEntityParameterKey = 'id'
type RecoilFamilyParameter = Team['id']
type RecoilFamily<E> = (parameter?: RecoilFamilyParameter) => RecoilState<Partial<E>>

export function useRecoilFamilyLoader<E extends RecoilEntity>(
  family: RecoilFamily<E>,
  parameter: RecoilEntityParameterKey = 'id',
) {
  const familyLoader = buildFamilyLoader(family, parameter)
  const loadOnRecoil = useRecoilCallback(familyLoader)

  return loadOnRecoil
}

export const buildFamilyLoader = <E extends RecoilEntity>(
  family: RecoilFamily<E>,
  parameter: RecoilEntityParameterKey,
) => ({ snapshot, set }: RecoilInterfaceCallback) => (data?: E | E[]) => {
  if (!data) return

  const loadOnRecoil = (singleData: E) => {
    if (!singleData) return

    const atom = family(singleData[parameter])
    const originalValue = snapshot.getLoadable(atom).getValue()
    const newValue = deepmerge(originalValue, singleData)

    return set(atom, newValue)
  }

  return Array.isArray(data) ? data.map(loadOnRecoil) : loadOnRecoil(data)
}
