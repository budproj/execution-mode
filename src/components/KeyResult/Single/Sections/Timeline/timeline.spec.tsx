import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionTimeline from './timeline'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('displays the skeleton component if it is being loaded', () => {
    sinon.stub(recoil, 'useRecoilValue')

    const result = enzyme.shallow(<KeyResultSectionTimeline />)

    const skeleton = result.find('KeyResultSectionTimelineSkeleton')

    expect(skeleton.length).toEqual(1)
  })

  it('displays the content with the check-ins if it was loaded', () => {
    const noOfFakeCheckIns = faker.random.number({ max: 100 })
    const fakeCheckIns = [...new Array(noOfFakeCheckIns)].map(() => faker.helpers.userCard)

    sinon.stub(recoil, 'useRecoilValue').returns(fakeCheckIns)

    const result = enzyme.shallow(<KeyResultSectionTimeline />)

    const content = result.find('KeyResultSectionTimelineContent')

    expect(content.prop('checkIns')).toEqual(fakeCheckIns)
  })
})
