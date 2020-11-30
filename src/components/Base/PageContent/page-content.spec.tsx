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

  it('renders provided children', () => {
    const result = enzyme.shallow(
      <PageContent>
        <FakeComponent />
      </PageContent>,
    )

    const renderedChild = result.find('FakeComponent')

    expect(renderedChild.length).toEqual(1)
  })
})
