import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import { SIGNAL, COLOR_SCHEME_HASHMAP } from './constants'
import useValueSignal, { ValueSignalAttributes } from './hook'

interface TestComponentProperties {
  fakeValue: number
  customColorScheme?: typeof COLOR_SCHEME_HASHMAP
}

const DummyComponent = (_attributes: ValueSignalAttributes) => {
  return <p>{faker.random.word()}</p>
}

const TestComponent = ({ fakeValue, customColorScheme }: TestComponentProperties) => {
  const attributes = useValueSignal(fakeValue, customColorScheme)[2]

  return <DummyComponent {...attributes} />
}

describe('hook returned attributes', () => {
  it('defines correctly a positive signal', () => {
    const fakeValue = faker.random.number({ min: 1 })

    const wrapper = enzyme.mount(<TestComponent fakeValue={fakeValue} />)

    const expectedAttributes = {
      signal: 'positive',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('defines correctly a negative signal', () => {
    const fakeValue = faker.random.number({ max: -1 })

    const wrapper = enzyme.mount(<TestComponent fakeValue={fakeValue} />)

    const expectedAttributes = {
      signal: 'negative',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('defines correctly a neutral signal', () => {
    const fakeValue = 0

    const wrapper = enzyme.mount(<TestComponent fakeValue={fakeValue} />)

    const expectedAttributes = {
      signal: 'neutral',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('defines correctly a positive signal indicator', () => {
    const fakeValue = faker.random.number({ min: 1 })

    const wrapper = enzyme.mount(<TestComponent fakeValue={fakeValue} />)

    const expectedAttributes = {
      indicator: '+',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('defines correctly a negative signal indicator', () => {
    const fakeValue = faker.random.number({ max: -1 })

    const wrapper = enzyme.mount(<TestComponent fakeValue={fakeValue} />)

    const expectedAttributes = {
      indicator: '-',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('defines correctly a neutral signal indicator', () => {
    const fakeValue = 0

    const wrapper = enzyme.mount(<TestComponent fakeValue={fakeValue} />)

    const expectedAttributes = {
      indicator: '',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('defines correctly a positive signal color', () => {
    const fakeValue = faker.random.number({ min: 1 })

    const wrapper = enzyme.mount(<TestComponent fakeValue={fakeValue} />)

    const expectedAttributes = {
      colorScheme: 'green',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('defines correctly a negative signal color', () => {
    const fakeValue = faker.random.number({ max: -1 })

    const wrapper = enzyme.mount(<TestComponent fakeValue={fakeValue} />)

    const expectedAttributes = {
      colorScheme: 'red',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('defines correctly a neutral signal color', () => {
    const fakeValue = 0

    const wrapper = enzyme.mount(<TestComponent fakeValue={fakeValue} />)

    const expectedAttributes = {
      colorScheme: 'gray',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })
})

describe('hook customizations', () => {
  it('can customize the returned positive colorScheme', () => {
    const fakeValue = faker.random.number({ min: 1 })
    const customPositiveScheme = faker.random.word()
    const customColorScheme = {
      [SIGNAL.POSITIVE]: customPositiveScheme,
    }

    const wrapper = enzyme.mount(
      <TestComponent fakeValue={fakeValue} customColorScheme={customColorScheme as any} />,
    )

    const expectedAttributes = {
      colorScheme: customPositiveScheme,
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('can customize the returned negative colorScheme', () => {
    const fakeValue = faker.random.number({ max: -1 })
    const customNegativeScheme = faker.random.word()
    const customColorScheme = {
      [SIGNAL.NEGATIVE]: customNegativeScheme,
    }

    const wrapper = enzyme.mount(
      <TestComponent fakeValue={fakeValue} customColorScheme={customColorScheme as any} />,
    )

    const expectedAttributes = {
      colorScheme: customNegativeScheme,
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('can customize the returned neutral colorScheme', () => {
    const fakeValue = 0
    const customNeutralScheme = faker.random.word()
    const customColorScheme = {
      [SIGNAL.NEUTRAL]: customNeutralScheme,
    }

    const wrapper = enzyme.mount(
      <TestComponent fakeValue={fakeValue} customColorScheme={customColorScheme as any} />,
    )

    const expectedAttributes = {
      colorScheme: customNeutralScheme,
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })
})
