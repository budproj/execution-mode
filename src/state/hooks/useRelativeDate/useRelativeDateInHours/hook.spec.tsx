import { format, subHours } from 'date-fns'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import useRelativeDateInHours from './hook'

interface TestComponentProperties {
  fakeDate: Date
}

const TestComponent = ({ fakeDate }: TestComponentProperties) => {
  const relativeDate = useRelativeDateInHours(fakeDate)

  return <p>{relativeDate}</p>
}

describe('resolution of relative date', () => {
  it('formats a date when it is the same hour', () => {
    const fakeRootDate = faker.date.past()
    const hoursToSubtract = 0
    const fakeDate = subHours(fakeRootDate, hoursToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Na última hora')
  })

  it('formats a date when it is one hour ago', () => {
    const fakeRootDate = faker.date.past()
    const hoursToSubtract = 1
    const fakeDate = subHours(fakeRootDate, hoursToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${hoursToSubtract} hour ago`)
  })

  it('formats a date when it is in this day', () => {
    const fakeRootDate = faker.date.past()
    const hoursToSubtract = faker.random.number({ min: 2, max: 24 })
    const fakeDate = subHours(fakeRootDate, hoursToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${hoursToSubtract} hours ago`)
  })

  it('formats a date when it is more than a day', () => {
    const fakeRootDate = faker.date.past()
    const hoursToSubtract = faker.random.number({ min: 24, max: 1000 })
    const fakeDate = subHours(fakeRootDate, hoursToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()
    const expectedFormattedDate = format(fakeDate, 'M/d/yyyy')

    clock.restore()

    expect(date).toEqual(expectedFormattedDate)
  })
})
