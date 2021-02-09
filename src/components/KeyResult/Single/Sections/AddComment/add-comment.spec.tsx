import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionAddComment from './add-comment'

describe('component interations', () => {
  afterEach(() => sinon.restore())

  it('asks to create a new comment on our remote server', async () => {
    const spy = sinon.spy()
    const fakeID = faker.random.uuid()
    const fakeComment = faker.lorem.paragraph()

    sinon.stub(apollo, 'useMutation').returns([spy] as any)
    sinon.stub(recoil, 'useRecoilValue')

    const wrapper = enzyme.shallow(<KeyResultSectionAddComment keyResultID={fakeID} />)

    const actions = { resetForm: sinon.fake() }
    const values = { text: fakeComment }
    const formik = wrapper.find('Formik')
    formik.simulate('submit', values, actions)

    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        keyResultCommentInput: {
          keyResultId: fakeID,
          text: fakeComment,
        },
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('asks to reset the form after submitting it', async () => {
    const spy = sinon.spy()
    const fakeID = faker.random.uuid()

    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)
    sinon.stub(recoil, 'useRecoilValue')

    const wrapper = enzyme.shallow(<KeyResultSectionAddComment keyResultID={fakeID} />)

    const actions = { resetForm: spy }
    const values = { text: faker.random.word() }
    const formik = wrapper.find('Formik')
    formik.simulate('submit', values, actions)

    await Promise.resolve()

    expect(spy.called).toEqual(true)
  })
})
