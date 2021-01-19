import { format, subMinutes } from 'date-fns'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import useRelativeDateInMinutes from './hook'

interface TestComponentProperties {
  fakeDate: Date
}

const TestComponent = ({ fakeDate }: TestComponentProperties) => {
  const relativeDate = useRelativeDateInMinutes(fakeDate)

  return <p>{relativeDate}</p>
}

describe('resolution of relative date', () => {
  it('formats a date when it is the same minute', () => {
    const fakeRootDate = faker.date.past()
    const minutesToSubtract = 0
    const fakeDate = subMinutes(fakeRootDate, minutesToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual('Agora há pouco')
  })

  it('formats a date when it is one minute ago', () => {
    const fakeRootDate = faker.date.past()
    const minutesToSubtract = 1
    const fakeDate = subMinutes(fakeRootDate, minutesToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${minutesToSubtract} minute ago`)
  })

  it('formats a date when it is in this hour', () => {
    const fakeRootDate = faker.date.past()
    const minutesToSubtract = faker.random.number({ min: 2, max: 60 })
    const fakeDate = subMinutes(fakeRootDate, minutesToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()

    clock.restore()

    expect(date).toEqual(`${minutesToSubtract} minutes ago`)
  })

  it('formats a date when it is more than an hour', () => {
    const fakeRootDate = faker.date.past()
    const minutesToSubtract = faker.random.number({ min: 60, max: 1000 })
    const fakeDate = subMinutes(fakeRootDate, minutesToSubtract)

    const clock = sinon.useFakeTimers()
    clock.setSystemTime(fakeRootDate)

    const result = enzyme.shallow(<TestComponent fakeDate={fakeDate} />)

    const date = result.find('p').text()
    const expectedFormattedDate = format(fakeDate, 'M/d/yyyy')

    clock.restore()

    expect(date).toEqual(expectedFormattedDate)
  })
})
