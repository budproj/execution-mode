import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultDrawer from './drawer'

const selectOpenDrawerMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('OPEN')
})

const selectCommentEnabledMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('COMMENT_ENABLED')
})

const selectProgressDraftMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('PROGRESS_DRAFT')
})

const selectCurrentProgressMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('CURRENT_PROGRESS')
})

describe('expected behaviors', () => {
  afterEach(() => sinon.restore())

  it('renders the drawer content if the drawer is open', () => {
    const fakeID = faker.random.word()

    const stub = sinon.stub(recoil, 'useRecoilState')
    stub.withArgs(selectOpenDrawerMatcher).returns([fakeID, sinon.fake()])
    stub.returns([undefined, sinon.fake()])

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawerContent = result.find('KeyResultDrawerContent')

    expect(drawerContent.length).toEqual(1)
  })

  it('does not render the drawer content if the drawer is closed', () => {
    const stub = sinon.stub(recoil, 'useRecoilState')
    stub.withArgs(selectOpenDrawerMatcher).returns([undefined, sinon.fake()])
    stub.returns([undefined, sinon.fake()])

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawerContent = result.find('KeyResultDrawerContent')

    expect(drawerContent.length).toEqual(0)
  })

  it('removes the opened key result when drawer is closed', () => {
    const spy = sinon.spy()
    const stub = sinon.stub(recoil, 'useRecoilState')
    stub.withArgs(selectOpenDrawerMatcher).returns([undefined, spy])
    stub.returns([undefined, sinon.fake()])

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawer = result.find('Drawer')
    drawer.simulate('close')

    expect(spy.called).toEqual(true)
  })

  it('disables the comment when the drawer is closed', () => {
    const spy = sinon.spy()
    const stub = sinon.stub(recoil, 'useSetRecoilState')
    stub.withArgs(selectCommentEnabledMatcher).returns(spy)

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawer = result.find('Drawer')
    drawer.simulate('close')

    expect(spy.called).toEqual(true)
  })

  it('resets the draft value if it is different from the current progress', () => {
    const spy = sinon.spy()
    const oldProgress = faker.random.number()
    const newProgress = faker.random.number()

    const stub = sinon.stub(recoil, 'useRecoilState')
    stub.withArgs(selectProgressDraftMatcher).returns([newProgress, spy])
    stub.returns([undefined, sinon.fake()])

    sinon.stub(recoil, 'useRecoilValue').withArgs(selectCurrentProgressMatcher).returns(oldProgress)

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawer = result.find('Drawer')
    drawer.simulate('close')

    expect(spy.called).toEqual(true)
  })

  it('does not reset the draft value if it is equal as the current progress', () => {
    const spy = sinon.spy()
    const progress = faker.random.number()

    const stub = sinon.stub(recoil, 'useRecoilState')
    stub.withArgs(selectProgressDraftMatcher).returns([progress, spy])
    stub.returns([undefined, sinon.fake()])

    sinon.stub(recoil, 'useRecoilValue').withArgs(selectCurrentProgressMatcher).returns(progress)

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawer = result.find('Drawer')
    drawer.simulate('close')

    expect(spy.called).toEqual(false)
  })
})
