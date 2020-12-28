import enzyme from 'enzyme'
import React from 'react'
import { useIntl } from 'react-intl'
import * as recoil from 'recoil'
import sinon from 'sinon'

import messages from './messages'
import ObjectivesPage from './objectives'

describe('page control behaviors', () => {
  afterEach(() => sinon.restore())

  it('sets the page title upon mounting', () => {
    const spy = sinon.spy()
    const intl = useIntl()
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    enzyme.shallow(<ObjectivesPage />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(intl.formatMessage(messages.pageTitle))

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('hides the Breadcrumb if that is the root page', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<ObjectivesPage isRootPage />)

    const pageContent = result.find('PageContent')

    expect(pageContent.prop('showBreadcrumb')).toEqual(false)
  })

  it('hides the Breadcrumb if that is not the root page', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<ObjectivesPage isRootPage={false} />)

    const pageContent = result.find('PageContent')

    expect(pageContent.prop('showBreadcrumb')).toEqual(true)
  })

  it('hides the Breadcrumb by default', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<ObjectivesPage />)

    const pageContent = result.find('PageContent')

    expect(pageContent.prop('showBreadcrumb')).toEqual(true)
  })
})
