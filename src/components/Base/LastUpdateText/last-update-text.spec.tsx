import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import * as useRelativeDate from 'src/state/hooks/useRelativeDate'

import LastUpdateText from './last-update-text'

describe('date conditional formatting', () => {
  afterEach(() => sinon.restore())

  it('displays the correct relative date', () => {
    const fakeFormattedDate = faker.random.word()
    sinon.stub(useRelativeDate, 'default').returns([fakeFormattedDate] as any)

    const result = enzyme.shallow(<LastUpdateText date={faker.date.past()} />)

    const text = result.find('Text')

    expect(text.text()).toEqual(`Última atualização ${fakeFormattedDate.toLowerCase()} por `)
  })

  it('displays the correct author', () => {
    const fakeAuthor = faker.random.word()
    sinon.mock(useRelativeDate).expects('default').atLeast(1).returns([faker.random.word()])

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
