import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultDrawer from './drawer'

const selectOpenDrawerMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('OPEN')
})

const selectLoadedDrawerMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('LOADED')
})

describe('expected behaviors', () => {
  afterEach(() => sinon.restore())

  it('renders the drawer content if the drawer is open', () => {
    const fakeID = faker.random.word()

    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())
    sinon.stub(recoil, 'useRecoilValue').returns(fakeID)

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawerContent = result.find('KeyResultDrawerContent')

    expect(drawerContent.length).toEqual(1)
  })

  it('does not render the drawer content if the drawer is closed', () => {
    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())
    sinon.stub(recoil, 'useRecoilValue')

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawerContent = result.find('KeyResultDrawerContent')

    expect(drawerContent.length).toEqual(0)
  })

  it('removes the opened key result when drawer is closed', () => {
    const spy = sinon.spy()
    const stub = sinon.stub(recoil, 'useResetRecoilState')
    stub.withArgs(selectOpenDrawerMatcher).returns(spy)
    stub.returns(sinon.fake())
    sinon.stub(recoil, 'useRecoilValue')
    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawer = result.find('Drawer')
    drawer.simulate('close')

    expect(spy.called).toEqual(true)
  })

  it('resets the loaded state when the drawer is closed', () => {
    const spy = sinon.spy()
    const stub = sinon.stub(recoil, 'useResetRecoilState')
    stub.withArgs(selectLoadedDrawerMatcher).returns(spy)
    stub.returns(sinon.fake())
    sinon.stub(recoil, 'useRecoilValue')
    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawer = result.find('Drawer')
    drawer.simulate('close')

    expect(spy.called).toEqual(true)
  })

  it('resets the draft value when the drawer is closed', () => {
    const currentProgress = faker.random.number()
    const spy = sinon.spy()

    sinon.stub(recoil, 'useRecoilValue').returns(currentProgress)
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)
    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawer = result.find('Drawer')
    drawer.simulate('close')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(currentProgress)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
