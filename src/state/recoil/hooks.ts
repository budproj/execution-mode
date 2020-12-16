import { RecoilState, useRecoilCallback } from 'recoil'

import { Team } from 'src/components/Team/types'

import { RecoilInterfaceCallback } from './types'

type RecoilEntity = Team | Partial<Team>
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
) => ({ set }: RecoilInterfaceCallback) => (initialData: E[]) =>
  initialData.map((singleData) => {
    const atom = family(singleData[parameter])
    return set(atom, singleData)
  })
