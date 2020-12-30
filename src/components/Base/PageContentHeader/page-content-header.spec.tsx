import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import PageContentHeader from './page-content-header'

const FakeComponent = () => <p>{faker.random.word()}</p>

describe('props customization', () => {
  it('renders a provided right wing component', () => {
    const result = enzyme.shallow(<PageContentHeader RightWing={FakeComponent} />)

    const renderedRightWing = result.find('FakeComponent')

    expect(renderedRightWing.length).toEqual(1)
  })

  it('can show the Breadcrumb', () => {
    const result = enzyme.shallow(<PageContentHeader showBreadcrumb />)

    const renderedRightWing = result.find('Breadcrumb')

    expect(renderedRightWing.length).toEqual(1)
  })

  it('can hide the Breadcrumb', () => {
    const result = enzyme.shallow(<PageContentHeader showBreadcrumb={false} />)

    const renderedRightWing = result.find('Breadcrumb')

    expect(renderedRightWing.length).toEqual(0)
  })

  it('renders the Breadcrumb by default', () => {
    const result = enzyme.shallow(<PageContentHeader />)

    const renderedRightWing = result.find('Breadcrumb')

    expect(renderedRightWing.length).toEqual(1)
  })
})
