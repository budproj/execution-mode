import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ObjectiveAccordionButton from './accordion-button'

describe('component expectations', () => {
  it('displays provided objective title if it is loaded', () => {
    const fakeObjective = {
      title: faker.random.word(),
    }

    const result = enzyme.shallow(<ObjectiveAccordionButton isLoaded objective={fakeObjective} />)

    const title = result.find('Heading')

    expect(title.text()).toEqual(fakeObjective.title)
  })

  it('displays provided objective title skeleton if it is not loaded', () => {
    const result = enzyme.shallow(<ObjectiveAccordionButton isLoaded={false} />)

    const skeleton = result.find('Heading').parent()

    expect(skeleton.prop('isLoaded')).toEqual(false)
  })

  it('displays provided objective end date formatted if it is loaded', () => {
    const fakeDate = new Date('2020-01-15')
    const fakeObjective = {
      cycle: {
        dateEnd: fakeDate,
      },
    }

    const result = enzyme.shallow(
      <ObjectiveAccordionButton isLoaded objective={fakeObjective as any} />,
    )

    const date = result.find('Text')

    expect(date.text()).toEqual('1/14/2020')
  })

  it('displays provided objective end date skeleton if it is not loaded', () => {
    const result = enzyme.shallow(<ObjectiveAccordionButton isLoaded={false} />)

    const skeleton = result.find('Text').parent()

    expect(skeleton.prop('isLoaded')).toEqual(false)
  })

  it('displays provided objective progress if it is loaded', () => {
    const fakeObjective = {
      currentProgress: faker.random.number(),
    }

    const result = enzyme.shallow(<ObjectiveAccordionButton isLoaded objective={fakeObjective} />)

    const circularProgress = result.find('CircularProgress')

    expect(circularProgress.prop('value')).toEqual(fakeObjective.currentProgress)
  })

  it('uses the confidence tag color in the circular progress', () => {
    const fakeObjective = {
      currentProgress: faker.random.number(),
    }
    const fakeTag = {
      color: faker.random.word(),
    }

    const result = enzyme.shallow(
      <ObjectiveAccordionButton
        isLoaded
        objective={fakeObjective}
        confidenceTag={fakeTag as any}
      />,
    )

    const circularProgress = result.find('CircularProgress')

    expect(circularProgress.prop('color')).toEqual(fakeTag.color)
  })

  it('displays the formated current progress in the circular progress', () => {
    const fakeObjective = {
      currentProgress: faker.random.number(),
    }

    const result = enzyme.shallow(<ObjectiveAccordionButton isLoaded objective={fakeObjective} />)

    const circularProgressLabel = result.find('CircularProgressLabel')

    expect(circularProgressLabel.text()).toEqual(`${fakeObjective.currentProgress}%`)
  })

  it('displays provided objective progress skeleton if it is not loaded', () => {
    const result = enzyme.shallow(<ObjectiveAccordionButton isLoaded={false} />)

    const skeleton = result.find('CircularProgress').parent()

    expect(skeleton.prop('isLoaded')).toEqual(false)
  })
})
