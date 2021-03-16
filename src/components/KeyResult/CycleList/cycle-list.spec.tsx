import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import sinon from 'sinon'

import * as KeyResultList from 'src/components/KeyResult/List'
import { cycleAtomFamily } from 'src/state/recoil/cycle'

import KeyResultCycleList from './cycle-list'

describe('info rendering', () => {
  afterEach(() => sinon.restore())

  it('renders a proper quarterly cycle title', () => {
    const fakeCycleID = faker.random.uuid()
    const fakeCycleTitle = faker.random.word()
    const fakeCycle = {
      id: fakeCycleID,
      cadence: 'QUARTERLY',
      title: fakeCycleTitle,
    }

    const initializeState = ({ set }: MutableSnapshot) => {
      set(cycleAtomFamily(fakeCycleID), fakeCycle as any)
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <KeyResultCycleList id={fakeCycleID} />
      </RecoilRoot>,
    )

    const cycleTitle = wrapper.find('Heading').first()

    expect(cycleTitle.text()).toEqual(fakeCycleTitle)
  })

  it('renders a proper quarterly cycle title with parent', () => {
    const fakeCycleID = faker.random.uuid()
    const fakeCycleTitle = faker.random.word()
    const fakeParentTitle = faker.random.word()
    const fakeCycle = {
      id: fakeCycleID,
      cadence: 'QUARTERLY',
      title: fakeCycleTitle,
      parent: {
        title: fakeParentTitle,
      },
    }

    const initializeState = ({ set }: MutableSnapshot) => {
      set(cycleAtomFamily(fakeCycleID), fakeCycle as any)
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <KeyResultCycleList id={fakeCycleID} />
      </RecoilRoot>,
    )

    const cycleTitle = wrapper.find('Heading').first()

    expect(cycleTitle.text()).toEqual(`${fakeCycleTitle} ${fakeParentTitle}`)
  })

  it('renders a propert yearly cycle title', () => {
    const fakeCycleID = faker.random.uuid()
    const fakeCycleTitle = faker.random.word()
    const fakeCycle = {
      id: fakeCycleID,
      cadence: 'YEARLY',
      title: fakeCycleTitle,
    }

    const initializeState = ({ set }: MutableSnapshot) => {
      set(cycleAtomFamily(fakeCycleID), fakeCycle as any)
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <KeyResultCycleList id={fakeCycleID} />
      </RecoilRoot>,
    )

    const cycleTitle = wrapper.find('Heading').first()

    expect(cycleTitle.text()).toEqual(`Anual ${fakeCycleTitle}`)
  })

  it('passes the key result IDs to the list', () => {
    const fakeCycleID = faker.random.uuid()
    const fakeFirstKeyResultID = faker.random.uuid()
    const fakeSecondKeyResultID = faker.random.uuid()
    const fakeKeyResults = [
      {
        id: fakeFirstKeyResultID,
        ...faker.helpers.userCard(),
      },
      {
        id: fakeSecondKeyResultID,
        ...faker.helpers.userCard(),
      },
    ]

    const fakeCycle = {
      id: fakeCycleID,
      cadence: 'YEARLY',
      title: faker.random.word(),
      keyResults: fakeKeyResults,
    }

    const initializeState = ({ set }: MutableSnapshot) => {
      set(cycleAtomFamily(fakeCycleID), fakeCycle as any)
    }

    // eslint-disable-next-line unicorn/no-null
    sinon.stub(KeyResultList, 'default').returns(null as any)

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <KeyResultCycleList id={fakeCycleID} />
      </RecoilRoot>,
    )

    const keyResultList = wrapper.find('default')

    expect(keyResultList.prop('keyResultIDs')).toEqual([
      fakeFirstKeyResultID,
      fakeSecondKeyResultID,
    ])
  })
})
