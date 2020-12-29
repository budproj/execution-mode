import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import CompanyProgressOverviewHeader from './header'

describe('custom properties', () => {
  it('can customize the message based on company name', () => {
    const fakeName = faker.random.word()

    const result = enzyme.shallow(<CompanyProgressOverviewHeader companyName={fakeName} />)

    const heading = result.find('Heading')
    const expectedText = `Como vai o desempenho do ${fakeName} como um todo?`

    expect(heading.text()).toEqual(expectedText)
  })

  it('can customize the message for MALE company gender', () => {
    const fakeName = faker.random.word()
    const fakeGender = 'MALE' as any

    const result = enzyme.shallow(
      <CompanyProgressOverviewHeader companyName={fakeName} companyGender={fakeGender} />,
    )

    const heading = result.find('Heading')
    const expectedText = `Como vai o desempenho do ${fakeName} como um todo?`

    expect(heading.text()).toEqual(expectedText)
  })

  it('can customize the message for FEMALE company gender', () => {
    const fakeName = faker.random.word()
    const fakeGender = 'FEMALE' as any

    const result = enzyme.shallow(
      <CompanyProgressOverviewHeader companyName={fakeName} companyGender={fakeGender} />,
    )

    const heading = result.find('Heading')
    const expectedText = `Como vai o desempenho da ${fakeName} como um todo?`

    expect(heading.text()).toEqual(expectedText)
  })

  it('adds a highlight tag to the company name', () => {
    const fakeName = faker.random.word()

    const result = enzyme.shallow(<CompanyProgressOverviewHeader companyName={fakeName} />)

    const highlight = result.find('Text')

    expect(highlight.text()).toEqual(fakeName)
  })
})
