import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { useIntl } from 'react-intl'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { keyResultOpenDrawer } from 'src/state/recoil/key-result/drawer'

import KeyResultsPage from './key-results'
import messages from './messages'

describe('page control behaviors', () => {
  afterEach(() => sinon.restore())

  it('sets the page title upon mounting', () => {
    const spy = sinon.spy()
    const intl = useIntl()
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    enzyme.shallow(<KeyResultsPage />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(intl.formatMessage(messages.pageTitle))

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('opens the drawer upon clicking a given line', () => {
    const spy = sinon.spy()
    const fakeID = faker.random.word()

    const setStateStub = sinon.stub(recoil, 'useSetRecoilState')
    setStateStub.withArgs(keyResultOpenDrawer).returns(spy)
    setStateStub.returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultsPage />)

    const keyResultView = result.find('KeyResultView')
    keyResultView.simulate('lineClick', fakeID)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeID)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('hides the Breadcrumb if that is the root page', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultsPage isRootPage />)

    const pageContent = result.find('PageContent')

    expect(pageContent.prop('showBreadcrumb')).toEqual(false)
  })

  it('hides the Breadcrumb if that is not the root page', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultsPage isRootPage={false} />)

    const pageContent = result.find('PageContent')

    expect(pageContent.prop('showBreadcrumb')).toEqual(true)
  })

  it('hides the Breadcrumb by default', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultsPage />)

    const pageContent = result.find('PageContent')

    expect(pageContent.prop('showBreadcrumb')).toEqual(true)
  })
})
