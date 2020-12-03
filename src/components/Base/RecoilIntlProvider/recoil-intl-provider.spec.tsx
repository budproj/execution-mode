import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import RecoilIntlProvider from './recoil-intl-provider'

const availableLocales = ['pt-BR', 'en-US']

const FakeComponent = () => <p>{faker.random.word()}</p>

describe('props customization', () => {
  afterEach(() => sinon.restore())

  it('sets the provided locale in our state layer', () => {
    const fakeLocale = faker.helpers.randomize(availableLocales)
    const spy = sinon.spy()
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    enzyme.mount(<RecoilIntlProvider locale={fakeLocale} />)

    const wasCalledAsExpected = spy.calledOnceWithExactly(fakeLocale)

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('renders the provided children', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    const result = enzyme.shallow(
      <RecoilIntlProvider locale="pt-BR">
        <FakeComponent />
      </RecoilIntlProvider>,
    )

    const childrenComponent = result.find('FakeComponent')

    expect(childrenComponent.length).toEqual(1)
  })
})
