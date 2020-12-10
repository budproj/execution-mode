import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Page from './page'

const FakeComponent = () => <p>{faker.random.word()}</p>

describe('props customization', () => {
  it('renders a single child', () => {
    const result = enzyme.shallow(
      <Page>
        <FakeComponent />
      </Page>,
    )

    const renderedChild = result.find('FakeComponent')

    expect(renderedChild.length).toEqual(1)
  })

  it('renders multiple children', () => {
    const result = enzyme.shallow(
      <Page>
        <FakeComponent />
        <FakeComponent />
      </Page>,
    )

    const renderedChild = result.find('FakeComponent')

    expect(renderedChild.length).toEqual(2)
  })

  it('pass any unhlanded props to root Box', () => {
    const properties = faker.helpers.userCard()
    const result = enzyme.shallow(
      <Page {...properties}>
        <FakeComponent />
      </Page>,
    )

    const box = result.find('Box')

    expect(box.props()).toMatchObject(properties)
  })
})
