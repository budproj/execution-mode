import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import KeyResultSectionTimelineCardsBase from './base'

const FakeComponent = () => <p>{faker.lorem.paragraph()}</p>

describe('component customizations', () => {
  it('can customize the border radius', () => {
    const fakeRadius = faker.random.number()

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardsBase borderRadius={fakeRadius}>
        <FakeComponent />
      </KeyResultSectionTimelineCardsBase>,
    )

    const stat = result.find('Stat')

    expect(stat.prop('borderRadius')).toEqual(fakeRadius)
  })

  it('can customize the border bottom radius', () => {
    const fakeRadius = faker.random.number()

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardsBase borderBottomRadius={fakeRadius}>
        <FakeComponent />
      </KeyResultSectionTimelineCardsBase>,
    )

    const stat = result.find('Stat')

    expect(stat.prop('borderBottomRadius')).toEqual(fakeRadius)
  })

  it('should render provided children', () => {
    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardsBase>
        <FakeComponent />
      </KeyResultSectionTimelineCardsBase>,
    )

    const fakeComponent = result.find('FakeComponent')

    expect(fakeComponent.length).toEqual(1)
  })
})
