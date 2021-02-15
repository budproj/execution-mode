import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import KeyResultListBodyColumnPercentualProgress from './percentual-progress'

describe('component expectations', () => {
  it('formats the progress as percent', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = faker.random.number({ min: 0, max: 100 })
    const fakeConfidence = faker.random.number({ min: 0, max: 100 })

    const fakeCheckIn = {
      progress: fakeProgress,
      confidence: fakeConfidence,
    }

    const initializeState = ({ set }: MutableSnapshot) => {
      set(keyResultAtomFamily(fakeID), {
        latestKeyResultCheckIn: fakeCheckIn as any,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <KeyResultListBodyColumnPercentualProgress id={fakeID} />
      </RecoilRoot>,
    )

    const result = wrapper.find('Text').find('p').text()

    expect(result).toEqual(`${fakeProgress}%`)
  })

  it('uses the current confidence tag as color for the progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = faker.random.number({ min: 0, max: 100 })
    const fakeConfidence = 50

    const fakeCheckIn = {
      progress: fakeProgress,
      confidence: fakeConfidence,
    }

    const initializeState = ({ set }: MutableSnapshot) => {
      set(keyResultAtomFamily(fakeID), {
        latestKeyResultCheckIn: fakeCheckIn as any,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <KeyResultListBodyColumnPercentualProgress id={fakeID} />
      </RecoilRoot>,
    )

    const result = wrapper.find('Text').find('Styled(p)').prop('color')

    expect(result).toEqual('yellow.500')
  })
})
