import { GetRecoilValue, SetRecoilState } from 'recoil'

export interface RecoilSpecificationGetter {
  get: GetRecoilValue
}

export interface RecoilSpecificationSetter {
  get: GetRecoilValue
  set: SetRecoilState
}
