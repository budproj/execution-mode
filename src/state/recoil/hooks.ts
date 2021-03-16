import deepmerge from 'deepmerge'
import { RecoilState, useRecoilCallback } from 'recoil'

import { overwriteMerge } from 'lib/deepmerge/merge-strategies'
import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

import { RecoilInterfaceCallback } from './types'

type RecoilEntity = Team | Objective | KeyResult | User | Cycle
type RecoilEntityParameterKey = 'id'
type RecoilFamilyParameter = Team['id']
type RecoilFamily<E> = (parameter?: RecoilFamilyParameter) => RecoilState<Partial<E> | undefined>

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
) => ({ snapshot, set }: RecoilInterfaceCallback) => (
  data?: Partial<E> | Array<Partial<E | undefined>>,
) => {
  if (!data) return

  const loadOnRecoil = (singleData?: Partial<E>) => {
    if (!singleData) return

    const atom = family(singleData[parameter])
    const originalValue = snapshot.getLoadable(atom).getValue() ?? {}
    const newValue = deepmerge(originalValue, singleData, { arrayMerge: overwriteMerge })

    return set(atom, newValue)
  }

  return Array.isArray(data)
    ? data.map((singleData) => loadOnRecoil(singleData))
    : loadOnRecoil(data)
}
