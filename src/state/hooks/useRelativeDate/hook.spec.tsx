import { subDays, subHours, subMinutes, subMonths, subWeeks, format } from 'date-fns'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import { RELATIVE_DATE_UNIT } from './constants'
import useRelativeDate from './hook'

interface TestComponentProperties {
  fakeDate: Date
  unit?: RELATIVE_DATE_UNIT
}

const TestComponent = ({ fakeDate, unit }: TestComponentProperties) => {
  const [relativeDate] = useRelativeDate(fakeDate, unit)

  return <p>{relativeDate}</p>
}

describe('automated resolution of relative date', () => {
  it('correctly identify the same date', () => {
    const fakeRootDate = faker.date.past()

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeRootDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Agora há pouco')
  })

  it('correctly identify a same minute date', () => {
    const fakeRootDate = faker.date.past()
    const fakeDate = subMinutes(fakeRootDate, 0)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Agora há pouco')
  })

  it('correctly identify a date 1 minute ago', () => {
    const fakeRootDate = faker.date.past()
    const minsToSubtract = 1
    const fakeDate = subMinutes(fakeRootDate, minsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('1 minute ago')
  })

  it('correctly identify a date less than 1 hour ago', () => {
    const fakeRootDate = faker.date.past()
    const minsToSubtract = faker.random.number({ min: 2, max: 59 })
    const fakeDate = subMinutes(fakeRootDate, minsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${minsToSubtract} minutes ago`)
  })

  it('correctly identify a date 59 minutes ago', () => {
    const fakeRootDate = faker.date.past()
    const minsToSubtract = 59
    const fakeDate = subMinutes(fakeRootDate, minsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${minsToSubtract} minutes ago`)
  })

  it('correctly identify a date 60 minutes ago', () => {
    const fakeRootDate = faker.date.past()
    const minsToSubtract = 60
    const fakeDate = subMinutes(fakeRootDate, minsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('1 hour ago')
  })

  it('correctly identify a date 119 minutes ago', () => {
    const fakeRootDate = faker.date.past()
    const minsToSubtract = 119
    const fakeDate = subMinutes(fakeRootDate, minsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('1 hour ago')
  })

  it('correctly identify a date 120 minutes ago', () => {
    const fakeRootDate = faker.date.past()
    const minsToSubtract = 120
    const fakeDate = subMinutes(fakeRootDate, minsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('2 hours ago')
  })

  it('correctly identify a date in the same day', () => {
    const fakeRootDate = faker.date.past()
    const hoursToSubtract = faker.random.number({ min: 2, max: 23 })
    const fakeDate = subHours(fakeRootDate, hoursToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${hoursToSubtract} hours ago`)
  })

  it('correctly identify a date 23 hours and 59 minutes ago', () => {
    const fakeRootDate = faker.date.past()
    const hoursToSubtract = 23
    const minsToSubtract = 59
    const fakeDate = subMinutes(subHours(fakeRootDate, hoursToSubtract), minsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${hoursToSubtract} hours ago`)
  })

  it('correctly identify a date 24 hours ago', () => {
    const fakeRootDate = faker.date.past()
    const hoursToSubtract = 24
    const fakeDate = subHours(fakeRootDate, hoursToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Ontem')
  })

  it('correctly identify a date 2 days ago', () => {
    const fakeRootDate = faker.date.past()
    const daysToSubtract = 2
    const fakeDate = subDays(fakeRootDate, daysToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${daysToSubtract} days ago`)
  })

  it('correctly identify a date in this week', () => {
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

  it('correctly identify a date 7 days from now', () => {
    const fakeRootDate = faker.date.past()
    const daysToSubtract = 7
    const fakeDate = subDays(fakeRootDate, daysToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${daysToSubtract} days ago`)
  })

  it('correctly identify a date 8 days from now', () => {
    const fakeRootDate = faker.date.past()
    const daysToSubtract = 8
    const fakeDate = subDays(fakeRootDate, daysToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('1 week ago')
  })

  it('correctly identify a date in this month', () => {
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

  it('correctly identify a date 4 weeks ago', () => {
    const fakeRootDate = faker.date.past()
    const weeksToSubtract = 4
    const fakeDate = subWeeks(fakeRootDate, weeksToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${weeksToSubtract} weeks ago`)
  })

  it('correctly identify a date 5 weeks ago', () => {
    const fakeRootDate = faker.date.past()
    const weeksToSubtract = 5
    const fakeDate = subWeeks(fakeRootDate, weeksToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('1 month ago')
  })

  it('correctly identify a date in the past 3 months', () => {
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

  it('correctly identify a date 3 months ago', () => {
    const fakeRootDate = faker.date.past()
    const monthsToSubtract = 3
    const fakeDate = subMonths(fakeRootDate, monthsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${monthsToSubtract} months ago`)
  })

  it('correctly identify a date 4 months ago or more', () => {
    const fakeRootDate = faker.date.past()
    const monthsToSubtract = faker.random.number({ min: 4, max: 1000 })
    const fakeDate = subMonths(fakeRootDate, monthsToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()
    const expectedDate = format(fakeDate, 'MMM d, yyyy')

    clock.restore()

    expect(date).toEqual(expectedDate)
  })
})

describe('manual resolution of relative date', () => {
  it('correctly identify the current date using manual minute unit', () => {
    const fakeRootDate = faker.date.past()

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(
      <TestComponent fakeDate={fakeRootDate} unit={RELATIVE_DATE_UNIT.MINUTE} />,
    )

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Agora há pouco')
  })

  it('correctly identify the current date using manual hour unit', () => {
    const fakeRootDate = faker.date.past()

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(
      <TestComponent fakeDate={fakeRootDate} unit={RELATIVE_DATE_UNIT.HOUR} />,
    )

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Na última hora')
  })

  it('correctly identify the current date using manual day unit', () => {
    const fakeRootDate = faker.date.past()

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(
      <TestComponent fakeDate={fakeRootDate} unit={RELATIVE_DATE_UNIT.DAY} />,
    )

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Hoje')
  })

  it('correctly identify the current date using manual week unit', () => {
    const fakeRootDate = faker.date.past()

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(
      <TestComponent fakeDate={fakeRootDate} unit={RELATIVE_DATE_UNIT.WEEK} />,
    )

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Nesta semana')
  })

  it('correctly identify the current date using manual month unit', () => {
    const fakeRootDate = faker.date.past()

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(
      <TestComponent fakeDate={fakeRootDate} unit={RELATIVE_DATE_UNIT.MONTH} />,
    )

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Neste mês')
  })
})
