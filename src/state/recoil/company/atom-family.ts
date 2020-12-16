import { atomFamily } from 'recoil'

import { Company } from 'src/components/Company/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::COMPANY_FAMILY`

export const companyAtomFamily = atomFamily<Company | undefined, Company['id'] | undefined>({
  key: KEY,
  default: undefined,
})

export default companyAtomFamily
