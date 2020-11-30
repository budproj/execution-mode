import enzyme from 'enzyme'
import faker from 'faker'
import * as router from 'next/router'
import React from 'react'
import sinon from 'sinon'

import MenuItem from './menu-item'

describe('props customization', () => {
  afterEach(() => sinon.restore())

  it('highlights the button if current route is href', () => {
    const fakeHref = faker.internet.url()
    sinon.stub(router, 'useRouter').returns({ pathname: fakeHref } as router.NextRouter)

    const result = enzyme.shallow(<MenuItem label={faker.random.word()} href={fakeHref} />)

    const buttonComponent = result.find('Button')

    expect(buttonComponent.prop('isActive')).toEqual(true)
  })

  it('does not highlight the button if current route is not href', () => {
    const fakeHref = faker.internet.url()
    sinon.stub(router, 'useRouter').returns({ pathname: faker.random.word() } as router.NextRouter)

    const result = enzyme.shallow(<MenuItem label={faker.random.word()} href={fakeHref} />)

    const buttonComponent = result.find('Button')

    expect(buttonComponent.prop('isActive')).toEqual(false)
  })

  it('renders a custom label', () => {
    const fakeLabel = faker.random.word()
    sinon.stub(router, 'useRouter').returns({ pathname: faker.random.word() } as router.NextRouter)

    const result = enzyme.shallow(<MenuItem label={fakeLabel} href={faker.internet.url()} />)

    const buttonComponent = result.find('Button')

    expect(buttonComponent.text()).toEqual(fakeLabel)
  })
})
