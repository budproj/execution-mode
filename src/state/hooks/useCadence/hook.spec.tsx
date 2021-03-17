import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import { CADENCE } from 'src/components/Cycle/constants'

import useCadence from './hook'

interface TestComponentProperties {
  fakeCadence: CADENCE
}

const DummyComponent = (_properties: any) => {
  return <p>{faker.random.word()}</p>
}

const TestComponent = ({ fakeCadence }: TestComponentProperties) => {
  const [cadence] = useCadence(fakeCadence)

  return <DummyComponent {...cadence} />
}

describe('hook returned cadence', () => {
  it('defines the correct prefix for yearly cadences', () => {
    const fakeCadence = CADENCE.YEARLY

    const wrapper = enzyme.mount(<TestComponent fakeCadence={fakeCadence} />)

    const expectedAttributes = {
      prefix: 'Anual',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('defines the correct prefix for quarterly cadences', () => {
    const fakeCadence = CADENCE.QUARTERLY

    const wrapper = enzyme.mount(<TestComponent fakeCadence={fakeCadence} />)

    const expectedAttributes = {
      prefix: 'Trimestral',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })
})
