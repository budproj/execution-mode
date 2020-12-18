import enzyme from 'enzyme'
import faker from 'faker'
import * as router from 'next/router'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { currentNextRoute, intlLocaleAtom } from 'src/state/recoil/intl'

import RecoilIntlProvider from './recoil-intl-provider'

const availableLocales = ['pt-BR', 'en-US']

const FakeComponent = () => <p>{faker.random.word()}</p>

describe('props customization', () => {
  afterEach(() => sinon.restore())

  it('sets the provided locale in our state layer', () => {
    const fakeLocale = faker.helpers.randomize(availableLocales)
    const spy = sinon.spy()
    const stub = sinon.stub(recoil, 'useSetRecoilState')

    stub.withArgs(intlLocaleAtom).returns(spy)
    stub.returns(sinon.fake())
    sinon.stub(router, 'useRouter').returns({} as any)

    enzyme.mount(<RecoilIntlProvider locale={fakeLocale} />)

    const wasCalledAsExpected = spy.calledOnceWithExactly(fakeLocale)

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('sets the provided Next page in our state layer', () => {
    const fakeLocale = faker.helpers.randomize(availableLocales)
    const spy = sinon.spy()
    const stub = sinon.stub(recoil, 'useSetRecoilState')
    const currentRoute = faker.random.word()

    stub.withArgs(currentNextRoute).returns(spy)
    stub.returns(sinon.fake())
    sinon.stub(router, 'useRouter').returns({ pathname: currentRoute } as any)

    enzyme.mount(<RecoilIntlProvider locale={fakeLocale} />)

    const wasCalledAsExpected = spy.calledOnceWithExactly(currentRoute)

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('renders the provided children', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.stub(router, 'useRouter').returns({} as any)
    const result = enzyme.shallow(
      <RecoilIntlProvider locale="pt-BR">
        <FakeComponent />
      </RecoilIntlProvider>,
    )

    const childrenComponent = result.find('FakeComponent')

    expect(childrenComponent.length).toEqual(1)
  })
})
