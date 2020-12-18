import { RecoilState, useRecoilCallback } from 'recoil'

import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'

import { RecoilInterfaceCallback } from './types'

type RecoilEntity = Partial<Team> | Partial<Objective> | undefined
type RecoilEntityParameterKey = 'id'
type RecoilFamilyParameter = Team['id']
type RecoilFamily<E> = (parameter?: RecoilFamilyParameter) => RecoilState<E | undefined>

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
) => ({ set }: RecoilInterfaceCallback) => (initialData?: E | E[]) => {
  if (!initialData) return

  const loadOnRecoil = (singleData: E) => {
    if (!singleData) return

    const atom = family(singleData[parameter])
    return set(atom, singleData)
  }

  return Array.isArray(initialData) ? initialData.map(loadOnRecoil) : loadOnRecoil(initialData)
}
