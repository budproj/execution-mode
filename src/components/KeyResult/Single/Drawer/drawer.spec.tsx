import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { keyResultOpenDrawer } from 'src/state/recoil/key-result/drawer'

import KeyResultDrawer from './drawer'

describe('expected behaviors', () => {
  afterEach(() => sinon.restore())

  it('renders the drawer content if the drawer is open', () => {
    const fakeID = faker.random.word()
    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub.withArgs(keyResultOpenDrawer).returns([fakeID, sinon.fake()])

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawerContent = result.find('KeyResultDrawerContent')

    expect(drawerContent.length).toEqual(1)
  })

  it('does not render the drawer content if the drawer is closed', () => {
    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub.withArgs(keyResultOpenDrawer).returns([undefined, sinon.fake()])

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawerContent = result.find('KeyResultDrawerContent')

    expect(drawerContent.length).toEqual(0)
  })

  it('removes the opened key result when drawer is closed', () => {
    const spy = sinon.spy()
    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub.withArgs(keyResultOpenDrawer).returns([undefined, spy])

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawer = result.find('Drawer')
    drawer.simulate('close')

    expect(spy.called).toEqual(true)
  })
})
