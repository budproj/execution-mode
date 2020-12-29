import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import CompanyProgressOverviewHeader from './header'

describe('custom properties', () => {
  afterEach(() => sinon.restore())

  it('can customize the message based on company name', () => {
    const fakeName = faker.random.word()
    const fakeCompany = { name: fakeName }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeCompany)

    const result = enzyme.shallow(<CompanyProgressOverviewHeader />)

    const heading = result.find('Heading')
    const expectedText = `Como vai o desempenho do ${fakeName} como um todo?`

    expect(heading.text()).toEqual(expectedText)
  })

  it('can customize the message for MALE company gender', () => {
    const fakeName = faker.random.word()
    const fakeGender = 'MALE' as any
    const fakeCompany = { name: fakeName, gender: fakeGender }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeCompany)

    const result = enzyme.shallow(<CompanyProgressOverviewHeader />)

    const heading = result.find('Heading')
    const expectedText = `Como vai o desempenho do ${fakeName} como um todo?`

    expect(heading.text()).toEqual(expectedText)
  })

  it('can customize the message for FEMALE company gender', () => {
    const fakeName = faker.random.word()
    const fakeGender = 'FEMALE' as any

    const fakeCompany = { name: fakeName, gender: fakeGender }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeCompany)

    const result = enzyme.shallow(<CompanyProgressOverviewHeader />)

    const heading = result.find('Heading')
    const expectedText = `Como vai o desempenho da ${fakeName} como um todo?`

    expect(heading.text()).toEqual(expectedText)
  })

  it('adds a highlight tag to the company name', () => {
    const fakeName = faker.random.word()
    const fakeCompany = { name: fakeName }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeCompany)

    const result = enzyme.shallow(<CompanyProgressOverviewHeader />)

    const highlight = result.find('Text')

    expect(highlight.text()).toEqual(fakeName)
  })
})
