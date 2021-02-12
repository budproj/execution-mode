import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon, { SinonSpy } from 'sinon'

import * as useRelativeDate from 'src/state/hooks/useRelativeDate'

import LastUpdateText from './last-update-text'

describe('date conditional formatting', () => {
  afterEach(() => sinon.restore())

  it('displays the correct relative date', () => {
    const fakeFormattedDate = faker.random.word()
    sinon.stub(useRelativeDate, 'default').returns([fakeFormattedDate, sinon.fake()] as any)

    const result = enzyme.shallow(<LastUpdateText date={faker.date.past()} />)

    const text = result.find('Text')

    expect(text.text()).toEqual(`Última atualização ${fakeFormattedDate.toLowerCase()} por `)
  })

  it('displays the correct author', () => {
    const fakeAuthor = faker.random.word()
    sinon
      .mock(useRelativeDate)
      .expects('default')
      .atLeast(1)
      .returns([faker.random.word(), sinon.fake()])

    const result = enzyme.shallow(<LastUpdateText author={fakeAuthor} date={new Date()} />)

    const text = result.find('Text')

    expect(text.text()).toContain(fakeAuthor)
  })

  it('updates the date upon render if the date prop changed', () => {
    const originalRelateDateHook = useRelativeDate.default
    const buildMockedRelativeDateHook = (spy: SinonSpy) => (initialDate?: Date) => {
      const originalResult = originalRelateDateHook(initialDate)
      const formattedRelativeDate = originalResult[0]
      const date = originalResult[3]

      return [formattedRelativeDate, spy, undefined, date]
    }

    const initialDate = faker.date.past()
    const newDate = faker.date.past()
    const spy = sinon.spy()
    sinon.stub(useRelativeDate, 'default').callsFake(buildMockedRelativeDateHook(spy) as any)

    const result = enzyme.shallow(<LastUpdateText date={initialDate} />)
    result.setProps({
      date: newDate,
    })
    result.update()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(newDate)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})

describe('corner cases', () => {
  it('displays a special empty state message when no data is provided', () => {
    const result = enzyme.shallow(<LastUpdateText />)

    const text = result.find('Text')

    expect(text.text()).toEqual('Nenhuma atualização recente')
  })
})
