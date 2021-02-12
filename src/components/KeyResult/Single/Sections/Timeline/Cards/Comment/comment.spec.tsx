import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionTimelineCardComment from './comment'

describe('component interactions', () => {
  afterEach(() => sinon.restore())

  it('triggers the mutation upon deletion request', () => {
    const spy = sinon.spy()
    const fakeID = faker.random.uuid()
    const fakeData = {
      id: fakeID,
    }

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.stub(apollo, 'useMutation').returns([spy] as any)

    const wrapper = enzyme.shallow(<KeyResultSectionTimelineCardComment data={fakeData} />)
    wrapper.simulate('delete')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        keyResultCommentID: fakeID,
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('triggers the onEntryDelete prop upon deletion request', async () => {
    const spy = sinon.spy()
    const fakeID = faker.random.uuid()
    const fakeData = {
      id: fakeID,
    }

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)

    const wrapper = enzyme.shallow(
      <KeyResultSectionTimelineCardComment data={fakeData} onEntryDelete={spy} />,
    )
    wrapper.simulate('delete')

    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly('Comentário')

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
