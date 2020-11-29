import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Page from './page'

const FakeComponent = () => <p>{faker.random.word()}</p>

describe('props customization', () => {
  it('renders the provided children', () => {
    const result = enzyme.shallow(
      <Page>
        <FakeComponent />
      </Page>,
    )

    const renderedChild = result.find('FakeComponent')

    expect(renderedChild.length).toEqual(1)
  })
})
