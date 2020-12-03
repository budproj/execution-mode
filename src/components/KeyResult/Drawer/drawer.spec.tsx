import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import KeyResultDrawer from './drawer'

describe('component customization', () => {
  it('hands over the open control to who is importing it', () => {
    const fakeOpen = faker.random.boolean()

    const result = enzyme.shallow(<KeyResultDrawer isOpen={fakeOpen} onClose={sinon.fake()} />)

    const drawer = result.find('Drawer')

    expect(drawer.prop('isOpen')).toEqual(fakeOpen)
  })

  it('hands over the on close function to who is importing it', () => {
    const fakeOnClose = sinon.fake()

    const result = enzyme.shallow(
      <KeyResultDrawer isOpen={faker.random.boolean()} onClose={fakeOnClose} />,
    )

    const drawer = result.find('Drawer')

    expect(drawer.prop('onClose')).toEqual(fakeOnClose)
  })

  it('passes any unhandled prop to the root drawer', () => {
    const properties = faker.helpers.userCard()

    const result = enzyme.shallow(
      <KeyResultDrawer isOpen={faker.random.boolean()} onClose={sinon.fake()} {...properties} />,
    )

    const drawer = result.find('Drawer')

    expect(drawer.props()).toMatchObject(properties)
  })
})
