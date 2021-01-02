import { format, subDays } from 'date-fns'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import LastUpdateText from './last-update-text'

describe('date conditional formatting', () => {
  afterEach(() => sinon.restore())

  it('displays the correct date when it is the same as today', () => {
    const fakeDate = faker.date.past()
    const clock = sinon.useFakeTimers()

    clock.setSystemTime(fakeDate)

    const result = enzyme.shallow(<LastUpdateText date={fakeDate} />)

    const text = result.find('Text')

    expect(text.text()).toContain('hoje')

    clock.restore()
  })

  it('displays the correct date when it is yesterday', () => {
    const fakeDate = faker.date.past()
    const fakeYesterdayDate = subDays(fakeDate, 1)
    const clock = sinon.useFakeTimers()

    clock.setSystemTime(fakeDate)

    const result = enzyme.shallow(<LastUpdateText date={fakeYesterdayDate} />)

    const text = result.find('Text')

    expect(text.text()).toContain('ontem')

    clock.restore()
  })

  it('displays the correct date when it is in this week', () => {
    const fakeDate = faker.date.past()
    const daysToSubtract = faker.random.number({ min: 2, max: 7 })
    const fakeThisWeekDate = subDays(fakeDate, daysToSubtract)
    const clock = sinon.useFakeTimers()

    clock.setSystemTime(fakeDate)

    const result = enzyme.shallow(<LastUpdateText date={fakeThisWeekDate} />)

    const text = result.find('Text')

    expect(text.text()).toContain(`${daysToSubtract} days ago`)

    clock.restore()
  })

  it('displays the correct date when it is a long time ago', () => {
    const fakeDate = faker.date.past()
    const daysToSubtract = faker.random.number({ min: 8 })
    const fakeLongTimeAgoDate = subDays(fakeDate, daysToSubtract)
    const clock = sinon.useFakeTimers()

    clock.setSystemTime(fakeDate)

    const result = enzyme.shallow(<LastUpdateText date={fakeLongTimeAgoDate} />)

    const text = result.find('Text')

    expect(text.text()).toContain(format(fakeLongTimeAgoDate, 'M/d/yyyy'))

    clock.restore()
  })

  it('displays the correct hour', () => {
    const fakeDate = faker.date.past()
    const daysToSubtract = faker.random.number({ min: 8 })
    const fakeLongTimeAgoDate = subDays(fakeDate, daysToSubtract)
    const clock = sinon.useFakeTimers()

    clock.setSystemTime(fakeDate)

    const result = enzyme.shallow(<LastUpdateText date={fakeLongTimeAgoDate} />)

    const text = result.find('Text')

    expect(text.text()).toContain(format(fakeLongTimeAgoDate, 'h:mm'))

    clock.restore()
  })

  it('displays the correct author', () => {
    const fakeAuthor = faker.random.word()

    const result = enzyme.shallow(<LastUpdateText author={fakeAuthor} date={new Date()} />)

    const text = result.find('Text')

    expect(text.text()).toContain(fakeAuthor)
  })
})

describe('corner cases', () => {
  it('displays a special empty state message when no data is provided', () => {
    const result = enzyme.shallow(<LastUpdateText />)

    const text = result.find('Text')

    expect(text.text()).toEqual('Nenhuma atualização recente')
  })
})
