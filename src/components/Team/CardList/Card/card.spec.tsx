import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { teamAtomFamily } from 'src/state/recoil/team'

import TeamCard from './card'

describe('component customizations', () => {
  afterEach(() => sinon.restore())

  it('uses data from the team atom family', () => {
    const fakeID = faker.random.word()
    const fakeName = faker.random.word()
    const fakeData = { name: fakeName }
    const stub = sinon.stub(recoil, 'useRecoilValue')

    stub.withArgs(teamAtomFamily(fakeID)).returns(fakeData)
    stub.returns({})

    const result = enzyme.shallow(<TeamCard id={fakeID} />)

    const name = result.find('Heading')

    expect(name.text()).toEqual(fakeName)
  })

  it('uses proper link', () => {
    const fakeID = faker.random.word()
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.returns({ isCompany: false })

    const result = enzyme.shallow(<TeamCard id={fakeID} />)

    const linkComponent = result.find('IntlLink')

    expect(linkComponent.prop('href')).toEqual(fakeID)
  })
})

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('should pass the confidence tag color to the slider', () => {
    const fakeID = faker.random.word()
    const fakeData = { confidence: 50 }

    const stub = sinon.stub(recoil, 'useRecoilValue')

    stub.withArgs(teamAtomFamily(fakeID)).returns(fakeData)

    const result = enzyme.shallow(<TeamCard id={fakeID} />)

    const slider = result.find('SliderWithFilledTrack')

    expect(slider.prop('trackColor')).toEqual('yellow.500')
  })
})

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('dispatches a confidence update after we receive a value for it', () => {
    sinon.stub(recoil, 'useRecoilValue').onSecondCall().returns({
      confidence: 50,
    })

    const result = enzyme.shallow(<TeamCard />)
    result.setProps({ id: faker.random.uuid() })

    const slider = result.find('SliderWithFilledTrack')

    expect(slider.prop('trackColor')).toEqual('yellow.500')
  })
})
