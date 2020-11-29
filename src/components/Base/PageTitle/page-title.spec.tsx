import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import PageTitle from './page-title'

describe('state layer interaction', () => {
  afterEach(() => sinon.restore())

  it('uses the page title from state layer', () => {
    const fakeTitle = faker.random.word()
    sinon.stub(recoil, 'useRecoilValue').returns(fakeTitle)

    const result = enzyme.shallow(<PageTitle />)

    const renderedTitle = result.find('Heading')

    expect(renderedTitle.text()).toEqual(fakeTitle)
  })
})
