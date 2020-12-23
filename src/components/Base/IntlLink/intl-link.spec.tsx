import enzyme from 'enzyme'
import faker from 'faker'
import * as router from 'next/router'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import IntlLink from './intl-link'

const FakeLabel = () => <p>{faker.random.word()}</p>

describe('expected behavior', () => {
  afterEach(() => sinon.restore())

  it('uses the provided href to preserve the page link', () => {
    const fakeHref = faker.internet.url()
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.stub(router, 'useRouter').returns({} as any)

    const result = enzyme.shallow(
      <IntlLink href={fakeHref}>
        <FakeLabel />
      </IntlLink>,
    )

    const link = result.find('Link')

    expect(link.prop('href')).toEqual(fakeHref)
  })

  it('uses the intl route to mask the original href', () => {
    const fakeIntlRoute = faker.internet.url()
    sinon.stub(recoil, 'useRecoilValue').returns(fakeIntlRoute)
    sinon.stub(router, 'useRouter').returns({} as any)

    const result = enzyme.shallow(
      <IntlLink href={faker.internet.url()}>
        <FakeLabel />
      </IntlLink>,
    )

    const link = result.find('Link')

    expect(link.prop('as')).toEqual(fakeIntlRoute)
  })

  it('uses the provided text as label for the link', () => {
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.stub(router, 'useRouter').returns({} as any)

    const result = enzyme.shallow(
      <IntlLink href={faker.internet.url()}>
        <FakeLabel />
      </IntlLink>,
    )

    const labelComponent = result.find('FakeLabel')

    expect(labelComponent.length).toEqual(1)
  })

  it('passes any unhandled props down', () => {
    const fakeProperties = faker.helpers.userCard()
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.stub(router, 'useRouter').returns({} as any)

    const result = enzyme.shallow(
      <IntlLink href={faker.internet.url()} {...fakeProperties}>
        <FakeLabel />
      </IntlLink>,
    )

    const link = result.find('Link')

    expect(link.props()).toMatchObject(fakeProperties)
  })

  it('uses the current pathname on relative href', () => {
    const fakeRelativeHref = faker.random.word()
    const fakePathname = faker.random.word()

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.stub(router, 'useRouter').returns({ pathname: fakePathname } as any)

    const result = enzyme.shallow(
      <IntlLink href={fakeRelativeHref}>
        <FakeLabel />
      </IntlLink>,
    )

    const link = result.find('Link')

    expect(link.prop('href')).toEqual(`${fakePathname}/${fakeRelativeHref}`)
  })
})
