import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import Title from './title'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('displays as a text if the user is not allowed to edit it', () => {
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([])

    const fakeID = faker.random.word()
    const fakePolicies = {
      update: 'DENY',
    }
    sinon.stub(recoil, 'useRecoilValue').returns(fakePolicies)

    const result = enzyme.shallow(<Title keyResultID={fakeID} />)

    const textComponent = result.find('Text')

    expect(textComponent.length).toEqual(1)
  })

  it('displays as an editable field if the user is allowed to edit it', () => {
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([])

    const fakeID = faker.random.word()
    const fakePolicies = {
      update: 'ALLOW',
    }
    sinon.stub(recoil, 'useRecoilValue').returns(fakePolicies)

    const result = enzyme.shallow(<Title keyResultID={fakeID} />)

    const editableComponent = result.find('Editable')

    expect(editableComponent.length).toEqual(1)
  })
})

describe('component side effects', () => {
  afterEach(() => sinon.restore())

  it('updates the local state upon the submission of a new title', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])

    const spy = sinon.spy()
    sinon.stub(recoil, 'useRecoilState').returns([faker.random.word(), spy])
    sinon.stub(recoil, 'useRecoilValue').returns({ update: 'ALLOW' })

    const result = enzyme.shallow(<Title keyResultID={faker.random.word()} />)

    const newTitle = faker.random.word()
    const editableComponent = result.find('Editable')
    editableComponent.simulate('submit', newTitle)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(newTitle)
    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the remote state upon the submission of a new title', () => {
    const fakeID = faker.random.word()
    const spy = sinon.spy()
    sinon.stub(recoil, 'useRecoilState').returns([faker.random.word(), sinon.fake()])
    sinon.stub(recoil, 'useRecoilValue').returns({ update: 'ALLOW' })
    sinon.stub(apollo, 'useMutation').returns([spy] as any)

    const result = enzyme.shallow(<Title keyResultID={fakeID} />)

    const newTitle = faker.random.word()
    const editableComponent = result.find('Editable')
    editableComponent.simulate('submit', newTitle)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        id: fakeID,
        title: newTitle,
      },
    })
    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
