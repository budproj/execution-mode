import enzyme from 'enzyme'
import React from 'react'

import useRelativeDateFallback from './hook'

interface TestComponentProperties {
  fakeDate: Date
}

const TestComponent = ({ fakeDate }: TestComponentProperties) => {
  const currentDate = new Date()
  const relativeDate = useRelativeDateFallback(fakeDate, currentDate)

  return <p>{relativeDate}</p>
}

describe('resolution of relative date', () => {
  it('formats a date accordingly', () => {
    const fakeRootDate = new Date('2020/12/01')

    const result = enzyme.shallow(<TestComponent fakeDate={fakeRootDate} />)

    const date = result.find('p').text()

    expect(date).toEqual('Dec 1, 2020')
  })
})
