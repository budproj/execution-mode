import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import CycleFilterYearSelector from './year-selector'

const fakeQueryResultCycle = {
  id: faker.random.uuid(),
  period: faker.random.word(),
}

describe('component renderization', () => {
  afterEach(() => sinon.restore())

  it('shows a list of comma separated years considering the filtered years', () => {
    const firstCycle = {
      ...fakeQueryResultCycle,
      period: faker.random.word(),
    }
    const secondCycle = {
      ...fakeQueryResultCycle,
      period: faker.random.word(),
    }

    sinon.stub(apollo, 'useLazyQuery').returns([sinon.fake(), {}] as any)
    sinon.stub(recoil, 'useRecoilValue').returns([firstCycle, secondCycle])
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())

    const wrapper = enzyme.shallow(
      <CycleFilterYearSelector
        filteredYearIDs={[faker.random.word()]}
        onYearFilter={sinon.fake()}
      />,
    )

    const textComponent = wrapper.find('Text')

    expect(textComponent.text()).toEqual(`${firstCycle.period}, ${secondCycle.period}`)
  })
})

describe('component lifecycle', () => {
  it('loads the returned cycles in our Recoil state', () => {
    const firstCycle = {
      ...fakeQueryResultCycle,
      period: faker.random.word(),
    }
    const secondCycle = {
      ...fakeQueryResultCycle,
      period: faker.random.word(),
    }
    const fakeData = {
      cycles: [firstCycle, secondCycle],
    }
    const spy = sinon.spy()

    const fakeFetcher = sinon.stub()
    sinon.stub(apollo, 'useLazyQuery').callsFake((_, options) => {
      fakeFetcher.callsFake(() => {
        if (options?.onCompleted) {
          options.onCompleted(fakeData)
        }
      })

      return [fakeFetcher, {}] as any
    })

    sinon.stub(recoil, 'useRecoilValue')
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    const wrapper = enzyme.shallow(
      <CycleFilterYearSelector
        filteredYearIDs={[faker.random.word()]}
        onYearFilter={sinon.fake()}
      />,
    )

    const menu = wrapper.find('Menu')
    menu.simulate('open')

    wrapper.update()

    const wasCalledAsExpected = spy.calledOnceWithExactly(fakeData.cycles)

    expect(wasCalledAsExpected).toEqual(true)
  })
})
