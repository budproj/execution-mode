import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

import { teamAtomFamily } from 'src/state/recoil/team'

import CompanyProgressOverviewBodyStampProgressIncrease from './progress-increase'

describe('conditional renderization', () => {
  it('displays the expected text with positive progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = 40

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const h3 = wrapper.find('h3')

    expect(h3.text()).toEqual('Variação de +40%')
  })

  it('displays the expected text with negative progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = -40

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const h3 = wrapper.find('h3')

    expect(h3.text()).toEqual('Variação de -40%')
  })

  it('displays the expected text with zero progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = 0

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const h3 = wrapper.find('h3')

    expect(h3.text()).toEqual('Sem variação')
  })

  it('displays the expected icon with positive progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = 40

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const icon = wrapper.find('ArrowUp')

    expect(icon.length).toEqual(1)
  })

  it('displays the expected icon with negative progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = -40

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const icon = wrapper.find('ArrowDown')

    expect(icon.length).toEqual(1)
  })

  it('displays the expected icon with zero progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = 0

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const icon = wrapper.find('Line')

    expect(icon.length).toEqual(1)
  })

  it('displays the correct color in the icon with positive progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = 40

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const icon = wrapper.find('ArrowUp')

    expect(icon.prop('fill')).toEqual('green.500')
    expect(icon.prop('stroke')).toEqual('green.500')
  })

  it('displays the correct color in the icon with negative progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = -40

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const icon = wrapper.find('ArrowDown')

    expect(icon.prop('fill')).toEqual('red.500')
    expect(icon.prop('stroke')).toEqual('red.500')
  })

  it('displays the correct color in the icon with zero progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = 0

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const icon = wrapper.find('Line')

    expect(icon.prop('fill')).toEqual('gray.500')
    expect(icon.prop('stroke')).toEqual('gray.500')
  })

  it('displays the correct color in the highlighted text with positive progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = 40

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const highlightedText = wrapper.find('h3').find('Text')

    expect(highlightedText.prop('color')).toEqual('green.500')
  })

  it('displays the correct color in the highlighted text with negative progress', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = -40

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const highlightedText = wrapper.find('h3').find('Text')

    expect(highlightedText.prop('color')).toEqual('red.500')
  })

  it('rounds the percentage', () => {
    const fakeID = faker.random.uuid()
    const fakeProgress = 40.1232131231232

    const initializeState = ({ set }: MutableSnapshot) => {
      set(teamAtomFamily(fakeID), {
        id: fakeID,
        progressIncreaseSinceLastWeek: fakeProgress,
      })
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <CompanyProgressOverviewBodyStampProgressIncrease companyID={fakeID} />
      </RecoilRoot>,
    )

    const progress = wrapper.find('h3').find('span')

    expect(progress.text()).toEqual('+40%')
  })
})
