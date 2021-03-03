import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import { USER_GENDER } from 'src/components/User/constants'

import useIntlGender from './hook'

interface TestComponentProperties {
  fakeGender: USER_GENDER
}

interface DummyComponentProperties {
  gender?: string
}

const DummyComponent = (_properties: DummyComponentProperties) => {
  return <p>{faker.random.word()}</p>
}

const TestComponent = ({ fakeGender }: TestComponentProperties) => {
  const [gender] = useIntlGender(fakeGender)

  return <DummyComponent gender={gender} />
}

describe('hook returned gender', () => {
  it('defines the correct gender for MALE enum', () => {
    const fakeGender = USER_GENDER.MALE

    const wrapper = enzyme.mount(<TestComponent fakeGender={fakeGender} />)

    const expectedAttributes = {
      gender: 'Masculino',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('defines the correct gender for FEMALE enum', () => {
    const fakeGender = USER_GENDER.FEMALE

    const wrapper = enzyme.mount(<TestComponent fakeGender={fakeGender} />)

    const expectedAttributes = {
      gender: 'Feminino',
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })

  it('defines gender as undefined if it was not a valid value', () => {
    const fakeGender = faker.random.word()

    const wrapper = enzyme.mount(<TestComponent fakeGender={fakeGender as any} />)

    const expectedAttributes = {
      gender: undefined,
    }
    const dummyComponentAttributes = wrapper.find('DummyComponent').props()

    expect(dummyComponentAttributes).toMatchObject(expectedAttributes)
  })
})
