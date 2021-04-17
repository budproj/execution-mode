import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import KeyResultSectionTimelineCardsBase from './base'

const FakeComponent = () => <p>{faker.lorem.paragraph()}</p>

describe('component expectations', () => {
  it('displays the options box if the user can delete that given entry', () => {
    const fakePolicies = {
      delete: 'ALLOW',
    }

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardsBase
        policy={fakePolicies as any}
        intlCardType={faker.random.word()}
      >
        <FakeComponent />
      </KeyResultSectionTimelineCardsBase>,
    )

    const options = result.find('KeyResultSectionTimelineCardBaseOptions')

    expect(options.length).toEqual(1)
  })
})

describe('component customizations', () => {
  it('can customize the border radius', () => {
    const fakeRadius = faker.random.number()

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardsBase
        borderRadius={fakeRadius}
        intlCardType={faker.random.word()}
      >
        <FakeComponent />
      </KeyResultSectionTimelineCardsBase>,
    )

    const box = result.find('Box')

    expect(box.prop('borderRadius')).toEqual(fakeRadius)
  })

  it('can customize the border bottom radius', () => {
    const fakeRadius = faker.random.number()

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardsBase
        borderBottomRadius={fakeRadius}
        intlCardType={faker.random.word()}
      >
        <FakeComponent />
      </KeyResultSectionTimelineCardsBase>,
    )

    const box = result.find('Box')

    expect(box.prop('borderBottomRadius')).toEqual(fakeRadius)
  })

  it('should render provided children', () => {
    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardsBase intlCardType={faker.random.word()}>
        <FakeComponent />
      </KeyResultSectionTimelineCardsBase>,
    )

    const fakeComponent = result.find('FakeComponent')

    expect(fakeComponent.length).toEqual(1)
  })

  it('can customize the border width', () => {
    const fakeWidth = faker.random.number()

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardsBase borderWidth={fakeWidth} intlCardType={faker.random.word()}>
        <FakeComponent />
      </KeyResultSectionTimelineCardsBase>,
    )

    const box = result.find('Box')

    expect(box.prop('borderWidth')).toEqual(fakeWidth)
  })

  it('can customize the background color', () => {
    const fakeColor = faker.internet.color()

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardsBase bg={fakeColor} intlCardType={faker.random.word()}>
        <FakeComponent />
      </KeyResultSectionTimelineCardsBase>,
    )

    const box = result.find('Box')

    expect(box.prop('bg')).toEqual(fakeColor)
  })
})
