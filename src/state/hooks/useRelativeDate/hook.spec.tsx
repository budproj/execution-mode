import React from 'react'
import sinon from 'sinon'
import enzyme from 'enzyme'
import faker from 'faker'
import useRelativeDate from './hook'
import { subDays, subHours, subMinutes } from 'date-fns'

interface TestComponentProperties {
  fakeDate: Date
}

const TestComponent = ({ fakeDate }: TestComponentProperties) => {
  const [relativeDate] = useRelativeDate(fakeDate)

  return <p>{relativeDate}</p>
}

describe('automated resolution of relative date', () => {
  afterEach(() => sinon.restore())

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

  it('correctly identify a date less than 1 hour ago', () => {
    const fakeRootDate = faker.date.past()
    const minsToSubtract = faker.random.number({ min: 1, max: 59 })
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

    expect(date).toEqual('Na última hora')
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

    expect(date).toEqual('Na última hora')
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
    const hoursToSubtract = faker.random.number({ min: 1, max: 23 })
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

  it.only('correctly identify a date 2 days ago', () => {
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
})
