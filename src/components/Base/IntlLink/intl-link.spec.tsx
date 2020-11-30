import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { mountWithRecoil } from 'lib/enzyme'

import IntlLink from './intl-link'

const FakeLabel = () => <p>{faker.random.word()}</p>

describe('expected behavior', () => {
  afterEach(() => sinon.restore())

  it('uses the provided href to preserve the page link', () => {
    const fakeHref = faker.internet.url()

    const result = mountWithRecoil(
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

    const result = mountWithRecoil(
      <IntlLink href={faker.internet.url()}>
        <FakeLabel />
      </IntlLink>,
    )

    const link = result.find('Link')

    expect(link.prop('as')).toEqual(fakeIntlRoute)
  })

  it('uses the provided text as label for the link', () => {
    const result = mountWithRecoil(
      <IntlLink href={faker.internet.url()}>
        <FakeLabel />
      </IntlLink>,
    )

    const labelComponent = result.find('a').find('FakeLabel')

    expect(labelComponent.length).toEqual(1)
  })

  it('passes any unhandled props down', () => {
    const fakeProperties = faker.helpers.userCard()

    const result = mountWithRecoil(
      <IntlLink href={faker.internet.url()} {...fakeProperties}>
        <FakeLabel />
      </IntlLink>,
    )

    const link = result.find('Link')

    expect(link.props()).toMatchObject(fakeProperties)
  })
})
