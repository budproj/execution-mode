import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ProgressIndicator from './progress-indicator'

describe('icon conditional rendering', () => {
  it('renders the expected icon upon increase prop', () => {
    const wrapper = enzyme.mount(<ProgressIndicator type="increase" />)

    const icon = wrapper.find('ArrowHeadUpIcon')

    expect(icon.length).toEqual(1)
  })

  it('renders the expected icon upon decrease prop', () => {
    const wrapper = enzyme.mount(<ProgressIndicator type="decrease" />)

    const icon = wrapper.find('ArrowHeadDownIcon')

    expect(icon.length).toEqual(1)
  })

  it('renders the expected icon upon neutral prop', () => {
    const wrapper = enzyme.mount(<ProgressIndicator type="neutral" />)

    const icon = wrapper.find('MinusSolidIcon')

    expect(icon.length).toEqual(1)
  })
})

describe('component customizations', () => {
  it('can define a custom color', () => {
    const fakeColor = faker.random.word()

    const wrapper = enzyme.mount(<ProgressIndicator color={fakeColor as any} />)

    const icon = wrapper.find('MinusSolidIcon')

    expect(icon.prop('fill')).toEqual(fakeColor)
  })

  it('can define a custom color scheme', () => {
    const fakeColorScheme = faker.random.word()

    const wrapper = enzyme.mount(<ProgressIndicator colorScheme={fakeColorScheme as any} />)

    const icon = wrapper.find('MinusSolidIcon')

    expect(icon.prop('fill')).toEqual(`${fakeColorScheme}.500`)
  })

  it('ignored the color scheme if a color was provided', () => {
    const fakeColor = faker.random.word()
    const fakeColorScheme = faker.random.word()

    const wrapper = enzyme.mount(
      <ProgressIndicator color={fakeColor as any} colorScheme={fakeColorScheme as any} />,
    )

    const icon = wrapper.find('MinusSolidIcon')

    expect(icon.prop('fill')).toEqual(fakeColor)
  })
})
