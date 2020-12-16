import { GetRecoilValue, RecoilState, SetRecoilState, Snapshot } from 'recoil'

export interface RecoilInterfaceGetter {
  get: GetRecoilValue
}

export interface RecoilInterfaceReadWrite {
  get: GetRecoilValue
  set: SetRecoilState
}

export type RecoilInterfaceCallback = {
  set: <T>(recoilValue: RecoilState<T>, valueOrUpdater: T | ((currentValue: T) => T)) => void
  reset: (recoilValue: RecoilState<any>) => void
  snapshot: Snapshot
  gotoSnapshot: (snapshot: Snapshot) => void
}
