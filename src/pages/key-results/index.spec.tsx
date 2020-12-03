import enzyme from 'enzyme'
import faker from 'faker'
import * as router from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { intlRouteAtom } from 'src/state/recoil/intl'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import KeyResultsPage, { messages } from '.'

describe('page control behaviors', () => {
  afterEach(() => sinon.restore())

  it('opens the drawer if a valid key result ID is provided in query parameters', () => {
    const fakeID = faker.random.word()
    const valueStub = sinon.stub(recoil, 'useRecoilValue')
    valueStub.withArgs(keyResultAtomFamily(fakeID)).returns(faker.random.word())
    valueStub.returns(faker.random.word())

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.stub(router, 'useRouter').returns({ query: { id: fakeID } } as any)

    const result = enzyme.shallow(<KeyResultsPage />)

    const drawer = result.find('KeyResultDrawer')

    expect(drawer.prop('isOpen')).toEqual(true)
  })

  it('does not open the drawer if an ID is provided, but it is invalid, or the key result is not yet loaded', () => {
    const fakeID = faker.random.word()
    const valueStub = sinon.stub(recoil, 'useRecoilValue')
    // eslint-disable-next-line unicorn/no-useless-undefined
    valueStub.withArgs(keyResultAtomFamily(fakeID)).returns(undefined)
    valueStub.returns(faker.random.word())

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.stub(router, 'useRouter').returns({ query: { id: fakeID } } as any)

    const result = enzyme.shallow(<KeyResultsPage />)

    const drawer = result.find('KeyResultDrawer')

    expect(drawer.prop('isOpen')).toEqual(false)
  })

  it('passes the provided ID on query string to the drawer', () => {
    const fakeID = faker.random.word()
    sinon.stub(recoil, 'useRecoilValue').returns(faker.random.word())

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.stub(router, 'useRouter').returns({ query: { id: fakeID } } as any)

    const result = enzyme.shallow(<KeyResultsPage />)

    const drawer = result.find('KeyResultDrawer')

    expect(drawer.prop('keyResultID')).toEqual(fakeID)
  })

  it('replaces the route with intlRoute without the ID parameter on drawer close', () => {
    const fakePathname = faker.random.word()
    const fakeIntlRoute = faker.random.word()
    const spy = sinon.spy()
    sinon.stub(router, 'useRouter').returns({
      query: { id: faker.random.word() },
      pathname: fakePathname,
      push: spy,
    } as any)

    const valueStub = sinon.stub(recoil, 'useRecoilValue')
    valueStub.withArgs(intlRouteAtom(fakePathname)).returns(fakeIntlRoute)
    valueStub.returns(faker.random.word())

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultsPage />)

    const drawer = result.find('KeyResultDrawer')
    drawer.simulate('close')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(
      {
        pathname: fakePathname,
        query: {},
      },
      fakeIntlRoute,
      {
        shallow: true,
      },
    )

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('sets the page title upon mounting', () => {
    const spy = sinon.spy()
    const intl = useIntl()
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(router).expects('useRouter').atLeast(1).returns({ query: {} })

    enzyme.shallow(<KeyResultsPage />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(intl.formatMessage(messages.pageTitle))

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('opens the drawer upon clicking a given line', () => {
    const spy = sinon.spy()
    const fakeID = faker.random.word()
    const fakePathname = faker.random.word()
    const fakeIntlRoute = faker.random.word()

    const valueStub = sinon.stub(recoil, 'useRecoilValue')
    valueStub.withArgs(keyResultAtomFamily(fakeID)).returns(faker.random.word())
    valueStub.withArgs(intlRouteAtom(fakePathname)).returns(fakeIntlRoute)
    valueStub.returns(faker.random.word())

    sinon.stub(router, 'useRouter').returns({
      query: {},
      pathname: fakePathname,
      push: spy,
    } as any)

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultsPage />)

    const keyResultView = result.find('KeyResultView')
    keyResultView.simulate('lineClick', fakeID)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(
      {
        pathname: fakePathname,
        query: {
          id: fakeID,
        },
      },
      `${fakeIntlRoute}?id=${fakeID}`,
      {
        shallow: true,
      },
    )

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
