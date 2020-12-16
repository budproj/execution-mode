import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import PageContent from './page-content'

const FakeComponent = () => <p>{faker.random.word()}</p>

describe('props customization', () => {
  it('passes the provided right wing to PageContentHeader', () => {
    const result = enzyme.shallow(<PageContent RightWing={FakeComponent} />)

    const renderedHeader = result.find('PageContentHeader')

    expect(renderedHeader.prop('RightWing')).toEqual(FakeComponent)
  })

  it('renders a single child', () => {
    const result = enzyme.shallow(
      <PageContent>
        <FakeComponent />
      </PageContent>,
    )

    const renderedChild = result.find('FakeComponent')

    expect(renderedChild.length).toEqual(1)
  })

  it('renders multiple children', () => {
    const result = enzyme.shallow(
      <PageContent>
        <FakeComponent />
        <FakeComponent />
      </PageContent>,
    )

    const renderedChild = result.find('FakeComponent')

    expect(renderedChild.length).toEqual(2)
  })

  it('pass any unhlanded props to root Box', () => {
    const properties = faker.helpers.userCard()
    const result = enzyme.shallow(
      <PageContent {...properties}>
        <FakeComponent />
      </PageContent>,
    )

    const box = result.find('Box').first()

    expect(box.props()).toMatchObject(properties)
  })
})
