import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionTimeline from './timeline'

const selectTimelineFetchedMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('TIMELINE::FETCHED')
})

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('displays the skeleton component if it is being loaded', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectTimelineFetchedMatcher).returns(false)

    const result = enzyme.shallow(<KeyResultSectionTimeline />)

    const skeleton = result.find('KeyResultSectionTimelineSkeleton')

    expect(skeleton.length).toEqual(1)
  })

  it('displays the content with the check-ins if it was loaded', () => {
    const noOfFakeEntries = faker.random.number({ max: 100 })
    const fakeEntries = [...new Array(noOfFakeEntries)].map(() => faker.helpers.userCard)

    const stub = sinon.stub(recoil, 'useRecoilValue').returns(fakeEntries)
    stub.withArgs(selectTimelineFetchedMatcher).returns(true)

    const result = enzyme.shallow(<KeyResultSectionTimeline />)

    const content = result.find('KeyResultSectionTimelineContent')

    expect(content.prop('entries')).toEqual(fakeEntries)
  })
})
