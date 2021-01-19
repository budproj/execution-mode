import { format, subMonths } from 'date-fns'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import useRelativeDateInMonths from './hook'

interface TestComponentProperties {
  fakeDate: Date
}

const TestComponent = ({ fakeDate }: TestComponentProperties) => {
  const relativeDate = useRelativeDateInMonths(fakeDate)

  return <p>{relativeDate}</p>
}

describe('resolution of relative date', () => {
  it('formats a date when it is the same month', () => {
    const fakeRootDate = faker.date.past()
    const monthsToSubtract = 0
    const fakeDate = subMonths(fakeRootDate, monthsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Neste mês')
  })

  it('formats a date when it is a month ago', () => {
    const fakeRootDate = faker.date.past()
    const monthsToSubtract = 1
    const fakeDate = subMonths(fakeRootDate, monthsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${monthsToSubtract} month ago`)
  })

  it('formats a date when it is in this quarter', () => {
    const fakeRootDate = faker.date.past()
    const monthsToSubtract = faker.random.number({ min: 2, max: 3 })
    const fakeDate = subMonths(fakeRootDate, monthsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${monthsToSubtract} months ago`)
  })

  it('formats a date when it is more than an quarter', () => {
    const fakeRootDate = faker.date.past()
    const monthsToSubtract = faker.random.number({ min: 4, max: 1000 })
    const fakeDate = subMonths(fakeRootDate, monthsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()
    const expectedFormattedDate = format(fakeDate, 'M/d/yyyy')

    clock.restore()

    expect(date).toEqual(expectedFormattedDate)
  })
})
