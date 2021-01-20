import { format, subWeeks } from 'date-fns'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import useRelativeDateInWeeks from './hook'

interface TestComponentProperties {
  fakeDate: Date
}

const TestComponent = ({ fakeDate }: TestComponentProperties) => {
  const currentDate = new Date()
  const relativeDate = useRelativeDateInWeeks(fakeDate, currentDate)

  return <p>{relativeDate}</p>
}

describe('resolution of relative date', () => {
  it('formats a date when it is the same week', () => {
    const fakeRootDate = faker.date.past()
    const weeksToSubtract = 0
    const fakeDate = subWeeks(fakeRootDate, weeksToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Nesta semana')
  })

  it('formats a date when it is a week ago', () => {
    const fakeRootDate = faker.date.past()
    const weeksToSubtract = 1
    const fakeDate = subWeeks(fakeRootDate, weeksToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${weeksToSubtract} week ago`)
  })

  it('formats a date when it is in this month', () => {
    const fakeRootDate = faker.date.past()
    const weeksToSubtract = faker.random.number({ min: 2, max: 4 })
    const fakeDate = subWeeks(fakeRootDate, weeksToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${weeksToSubtract} weeks ago`)
  })

  it('formats a date when it is more than an month', () => {
    const fakeRootDate = faker.date.past()
    const weeksToSubtract = faker.random.number({ min: 5, max: 1000 })
    const fakeDate = subWeeks(fakeRootDate, weeksToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()
    const expectedFormattedDate = format(fakeDate, 'M/d/yyyy')

    clock.restore()

    expect(date).toEqual(expectedFormattedDate)
  })
})
