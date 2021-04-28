import * as chakra from '@chakra-ui/react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultDrawerHeader from './header'

const selectIsScrollingMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('IS_SCROLLING')
})

const selectPoliciesMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('POLICIES')
})

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('does not show the check-in section if the user is scrolling', () => {
    const fakeID = faker.random.uuid()
    const fakePolicies = {
      childEntities: {
        keyResultCheckIn: {
          create: 'ALLOW',
        },
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectIsScrollingMatcher).returns(true)
    stub.withArgs(selectPoliciesMatcher).returns(fakePolicies)

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([false, sinon.fake()])
    sinon.mock(chakra).expects('useTheme').atLeast(1).returns({ zIndices: {} })

    const wrapper = enzyme.shallow(<KeyResultDrawerHeader keyResultID={fakeID} />)

    const sectionWrapper = wrapper.find('Collapse').last()

    expect(sectionWrapper.prop('in')).toEqual(false)
  })

  it('does not show the check-in section if the user is not scrolling, but it is not allowed to see it', () => {
    const fakeID = faker.random.uuid()
    const fakePolicies = {
      childEntities: {
        keyResultCheckIn: {
          create: 'DENY',
        },
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectIsScrollingMatcher).returns(false)
    stub.withArgs(selectPoliciesMatcher).returns(fakePolicies)

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([false, sinon.fake()])
    sinon.mock(chakra).expects('useTheme').atLeast(1).returns({ zIndices: {} })

    const wrapper = enzyme.shallow(<KeyResultDrawerHeader keyResultID={fakeID} />)

    const sectionWrapper = wrapper.find('Collapse').last()

    expect(sectionWrapper.prop('in')).toEqual(false)
  })

  it('shows the check-in section if the user is not scrolling and it is allowed to see it', () => {
    const fakeID = faker.random.uuid()
    const fakePolicies = {
      childEntities: {
        keyResultCheckIn: {
          create: 'ALLOW',
        },
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectIsScrollingMatcher).returns(false)
    stub.withArgs(selectPoliciesMatcher).returns(fakePolicies)

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([false, sinon.fake()])
    sinon.mock(chakra).expects('useTheme').atLeast(1).returns({ zIndices: {} })

    const wrapper = enzyme.shallow(<KeyResultDrawerHeader keyResultID={fakeID} />)

    const sectionWrapper = wrapper.find('Collapse').last()

    expect(sectionWrapper.prop('in')).toEqual(true)
  })

  it('shows the check-in section if the user is allowed to see it, is scrolling, but it is creating a check-in', () => {
    const fakeID = faker.random.uuid()
    const fakePolicies = {
      childEntities: {
        keyResultCheckIn: {
          create: 'ALLOW',
        },
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectIsScrollingMatcher).returns(true)
    stub.withArgs(selectPoliciesMatcher).returns(fakePolicies)

    sinon.stub(recoil, 'useRecoilState').returns([true, sinon.fake()])

    sinon.mock(chakra).expects('useTheme').atLeast(1).returns({ zIndices: {} })

    const wrapper = enzyme.shallow(<KeyResultDrawerHeader keyResultID={fakeID} />)

    const sectionWrapper = wrapper.find('Collapse').last()

    expect(sectionWrapper.prop('in')).toEqual(true)
  })

  it('shows the check-in button on header if the user is scrolling', () => {
    const fakeID = faker.random.uuid()
    const fakePolicies = {
      childEntities: {
        keyResultCheckIn: {
          create: 'ALLOW',
        },
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectIsScrollingMatcher).returns(true)
    stub.withArgs(selectPoliciesMatcher).returns(fakePolicies)

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([false, sinon.fake()])
    sinon.mock(chakra).expects('useTheme').atLeast(1).returns({ zIndices: {} })

    const wrapper = enzyme.shallow(<KeyResultDrawerHeader keyResultID={fakeID} />)

    const sectionWrapper = wrapper.find('Collapse').first()

    expect(sectionWrapper.prop('in')).toEqual(true)
  })

  it('hides the check-in button on header if the user is not scrolling', () => {
    const fakeID = faker.random.uuid()
    const fakePolicies = {
      childEntities: {
        keyResultCheckIn: {
          create: 'ALLOW',
        },
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectIsScrollingMatcher).returns(false)
    stub.withArgs(selectPoliciesMatcher).returns(fakePolicies)

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([false, sinon.fake()])
    sinon.mock(chakra).expects('useTheme').atLeast(1).returns({ zIndices: {} })

    const wrapper = enzyme.shallow(<KeyResultDrawerHeader keyResultID={fakeID} />)

    const sectionWrapper = wrapper.find('Collapse').first()

    expect(sectionWrapper.prop('in')).toEqual(false)
  })
})

describe('component interactions', () => {
  afterEach(() => sinon.restore())

  it('asks to open the create check-in form if clicked on the header button', () => {
    const fakeID = faker.random.uuid()
    const spy = sinon.spy()
    const fakePolicies = {
      childEntities: {
        keyResultCheckIn: {
          create: 'ALLOW',
        },
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectIsScrollingMatcher).returns(true)
    stub.withArgs(selectPoliciesMatcher).returns(fakePolicies)

    sinon.stub(recoil, 'useRecoilState').returns([true, spy])

    sinon.mock(chakra).expects('useTheme').atLeast(1).returns({ zIndices: {} })

    const wrapper = enzyme.shallow(<KeyResultDrawerHeader keyResultID={fakeID} />)

    const button = wrapper.find('Button')
    button.simulate('click')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(true)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the latest timeline entry with a new check-in when form is completed', () => {
    const fakeID = faker.random.uuid()
    const fakeCheckIn = faker.helpers.userCard()
    const spy = sinon.spy()
    const fakePolicies = {
      childEntities: {
        keyResultCheckIn: {
          create: 'ALLOW',
        },
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectIsScrollingMatcher).returns(true)
    stub.withArgs(selectPoliciesMatcher).returns(fakePolicies)

    sinon.stub(recoil, 'useRecoilState').returns([true, sinon.fake()])
    sinon.mock(chakra).expects('useTheme').atLeast(1).returns({ zIndices: {} })

    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    const wrapper = enzyme.shallow(<KeyResultDrawerHeader keyResultID={fakeID} />)

    const sectionAddCheckIn = wrapper.find('KeyResultSectionAddCheckIn')
    sectionAddCheckIn.simulate('completed', fakeCheckIn)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeCheckIn)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not show the check-in button if the user is not allowed to do a check-in', () => {
    const fakeID = faker.random.uuid()
    const fakePolicies = {
      childEntities: {
        keyResultCheckIn: {
          create: 'DENY',
        },
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectIsScrollingMatcher).returns(true)
    stub.withArgs(selectPoliciesMatcher).returns(fakePolicies)

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([false, sinon.fake()])
    sinon.mock(chakra).expects('useTheme').atLeast(1).returns({ zIndices: {} })

    const wrapper = enzyme.shallow(<KeyResultDrawerHeader keyResultID={fakeID} />)

    const sectionWrapper = wrapper.find('Collapse').first()

    expect(sectionWrapper.prop('in')).toEqual(false)
  })
})
