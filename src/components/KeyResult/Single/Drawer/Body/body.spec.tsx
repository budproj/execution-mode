import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultDrawerBody from './body'

const selectPoliciesMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('POLICIES')
})

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('displays the check-in section if the user is allowed to update the key result', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')

    stub.withArgs(selectPoliciesMatcher).returns({
      update: 'ALLOW',
    })

    const result = enzyme.shallow(<KeyResultDrawerBody keyResultID={faker.random.uuid()} />)

    const checkInSection = result.find('KeyResultSectionCheckIn')

    expect(checkInSection.length).toEqual(1)
  })

  it('does not displays the check-in section if the user is not allowed to update the key result', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')

    stub.withArgs(selectPoliciesMatcher).returns({
      update: 'DENY',
    })

    const result = enzyme.shallow(<KeyResultDrawerBody keyResultID={faker.random.uuid()} />)

    const checkInSection = result.find('KeyResultSectionCheckIn')

    expect(checkInSection.length).toEqual(0)
  })
})
