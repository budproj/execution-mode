import { subDays, format } from 'date-fns'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import useRelativeDateInDays from './hook'

interface TestComponentProperties {
  fakeDate: Date
}

const TestComponent = ({ fakeDate }: TestComponentProperties) => {
  const relativeDate = useRelativeDateInDays(fakeDate)

  return <p>{relativeDate}</p>
}

describe('resolution of relative date', () => {
  it('formats a date when it is the same day', () => {
    const fakeRootDate = faker.date.past()
    const daysToSubtract = 0
    const fakeDate = subDays(fakeRootDate, daysToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Hoje')
  })

  it('formats a date when it is yesterday', () => {
    const fakeRootDate = faker.date.past()
    const daysToSubtract = 1
    const fakeDate = subDays(fakeRootDate, daysToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Ontem')
  })

  it('formats a date when it is in this week', () => {
    const fakeRootDate = faker.date.past()
    const daysToSubtract = faker.random.number({ min: 2, max: 7 })
    const fakeDate = subDays(fakeRootDate, daysToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${daysToSubtract} days ago`)
  })

  it('formats a date when it is more than a week', () => {
    const fakeRootDate = faker.date.past()
    const daysToSubtract = faker.random.number({ min: 8, max: 1000 })
    const fakeDate = subDays(fakeRootDate, daysToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()
    const expectedFormattedDate = format(fakeDate, 'M/d/yyyy')

    clock.restore()

    expect(date).toEqual(expectedFormattedDate)
  })
})
