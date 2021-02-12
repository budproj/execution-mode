import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultDrawerBody from './body'

const selectIsScrollingMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('IS_SCROLLING')
})

const selectIsCreatingCheckInMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('IS_CREATING_CHECK_IN')
})

const selectEntryTypeMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('ENTRY_TYPE')
})

describe('component interations', () => {
  afterEach(() => sinon.restore())

  it('sets the isScrolling state to true when the user scrolls Y', () => {
    const fakeID = faker.random.uuid()
    const spy = sinon.spy()

    const stub = sinon.stub(recoil, 'useRecoilState')
    stub.withArgs(selectIsScrollingMatcher).returns([undefined, spy])
    stub.returns([undefined, sinon.fake()])

    const wrapper = enzyme.shallow(<KeyResultDrawerBody keyResultID={fakeID} />)

    const timeline = wrapper.find('KeyResultSectionTimeline')
    timeline.simulate('scrollY')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(true)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('closes the check-in form when the user scrolls Y and she/he was creating check-in', () => {
    const fakeID = faker.random.uuid()
    const spy = sinon.spy()

    const stub = sinon.stub(recoil, 'useRecoilState')
    stub.withArgs(selectIsCreatingCheckInMatcher).returns([true, spy])
    stub.returns([undefined, sinon.fake()])

    const wrapper = enzyme.shallow(<KeyResultDrawerBody keyResultID={fakeID} />)

    const timeline = wrapper.find('KeyResultSectionTimeline')
    timeline.simulate('scrollY')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(false)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('sets the isScrolling to false when the user react Y start', () => {
    const fakeID = faker.random.uuid()
    const spy = sinon.spy()

    const stub = sinon.stub(recoil, 'useRecoilState')
    stub.withArgs(selectIsScrollingMatcher).returns([true, spy])
    stub.returns([undefined, sinon.fake()])

    const wrapper = enzyme.shallow(<KeyResultDrawerBody keyResultID={fakeID} />)

    const timeline = wrapper.find('KeyResultSectionTimeline')
    timeline.simulate('scrollYReachStart')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(false)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the entry type upon entry delete', () => {
    const fakeID = faker.random.uuid()
    const spy = sinon.spy()
    const fakeEntry = faker.random.word()

    const stub = sinon.stub(recoil, 'useSetRecoilState')
    stub.withArgs(selectEntryTypeMatcher).returns(spy)

    sinon.stub(recoil, 'useRecoilState').returns([undefined, sinon.fake()])

    const wrapper = enzyme.shallow(<KeyResultDrawerBody keyResultID={fakeID} />)

    const timeline = wrapper.find('KeyResultSectionTimeline')
    timeline.simulate('entryDelete', fakeEntry)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeEntry)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
