import enzyme from 'enzyme'
import faker from 'faker'
import * as router from 'next/router'
import React from 'react'
import sinon from 'sinon'

import ButtonActivableByURL from './button-activable-by-url'

describe('props customization', () => {
  afterEach(() => sinon.restore())

  it('highlights the button if current route is href', () => {
    const fakeHref = faker.internet.url()
    sinon.stub(router, 'useRouter').returns({ pathname: fakeHref } as router.NextRouter)

    const result = enzyme.shallow(<ButtonActivableByURL href={fakeHref} />)

    const buttonComponent = result.find('Button')

    expect(buttonComponent.prop('isActive')).toEqual(true)
  })

  it('does not highlight the button if current route is not href', () => {
    const fakeHref = faker.internet.url()
    sinon.stub(router, 'useRouter').returns({ pathname: faker.random.word() } as router.NextRouter)

    const result = enzyme.shallow(<ButtonActivableByURL href={fakeHref} />)

    const buttonComponent = result.find('Button')

    expect(buttonComponent.prop('isActive')).toEqual(false)
  })
})
