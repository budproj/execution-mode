import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import TeamsOverviewBodyTableBodyColumnProgress from './progress'

describe('component expectations', () => {
  it('renders a skeleton in the progress bar if no team is provided', () => {
    const wrapper = enzyme.mount(<TeamsOverviewBodyTableBodyColumnProgress />)

    const firstSkeleton = wrapper.find('Skeleton').first()

    expect(firstSkeleton.prop('isLoaded')).toEqual(false)
  })

  it('renders a skeleton in the progress percent value if no team is provided', () => {
    const wrapper = enzyme.mount(<TeamsOverviewBodyTableBodyColumnProgress />)

    const lastSkeleton = wrapper.find('Skeleton').last()

    expect(lastSkeleton.prop('isLoaded')).toEqual(false)
  })

  it('displays the correct percent value', () => {
    const fakeProgress = faker.random.number({ max: 100 })
    const fakeTeam = {
      status: { progress: fakeProgress },
    }

    const wrapper = enzyme.mount(
      <TeamsOverviewBodyTableBodyColumnProgress team={fakeTeam as any} />,
    )

    const textComponent = wrapper.find('Text')

    expect(textComponent.text()).toEqual(`${fakeProgress}%`)
  })

  it('rounds the percent value in the displayed text', () => {
    const fakeProgress = 95.87
    const fakeTeam = {
      status: { progress: fakeProgress },
    }

    const wrapper = enzyme.mount(
      <TeamsOverviewBodyTableBodyColumnProgress team={fakeTeam as any} />,
    )

    const textComponent = wrapper.find('Text')

    expect(textComponent.text()).toEqual('96%')
  })
})
