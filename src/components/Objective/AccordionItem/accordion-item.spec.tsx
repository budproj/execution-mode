import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import ObjectiveAccordionItem from './accordion-item'

const objectiveAtomMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('OBJECTIVE')
})

describe('component data layer', () => {
  afterEach(() => sinon.restore())

  it('fetches the objective from our recoil state and passes it to our accordion button', () => {
    const fakeObjective = faker.helpers.userCard()

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(objectiveAtomMatcher).returns(fakeObjective)

    const result = enzyme
      .shallow(<ObjectiveAccordionItem />)
      .find('AccordionItem')
      .renderProp('children')({} as never)

    const accordionButton = result.find('ObjectiveAccordionButton')

    expect(accordionButton.prop('objective')).toEqual(fakeObjective)
  })

  it('consider as "loaded" if we have an objective and notify the accordion button', () => {
    const objectiveAtomMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
      return selector.key.includes('OBJECTIVE')
    })
    const fakeObjective = faker.helpers.userCard()

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(objectiveAtomMatcher).returns(fakeObjective)

    const result = enzyme
      .shallow(<ObjectiveAccordionItem />)
      .find('AccordionItem')
      .renderProp('children')({} as never)

    const accordionButton = result.find('ObjectiveAccordionButton')

    expect(accordionButton.prop('isLoaded')).toEqual(true)
  })

  it('consider as "not loaded" if we do not have an objective and notify the accordion button', () => {
    sinon.stub(recoil, 'useRecoilValue')
    const result = enzyme
      .shallow(<ObjectiveAccordionItem />)
      .find('AccordionItem')
      .renderProp('children')({} as never)

    const accordionButton = result.find('ObjectiveAccordionButton')

    expect(accordionButton.prop('isLoaded')).toEqual(false)
  })

  it('tells the panel if the current accordion is expanded', () => {
    const fakeExpanded = faker.random.boolean()

    sinon.stub(recoil, 'useRecoilValue')
    const result = enzyme
      .shallow(<ObjectiveAccordionItem />)
      .find('AccordionItem')
      .renderProp('children')({ isExpanded: fakeExpanded } as never)

    const accordionPanel = result.find('ObjectiveAccordionPanel')

    expect(accordionPanel.prop('isExpanded')).toEqual(fakeExpanded)
  })
})

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('dispatches a confidence update after we receive a value for it', () => {
    sinon
      .stub(recoil, 'useRecoilValue')
      .onSecondCall()
      .returns({
        status: { confidence: 50 },
      })

    const result = enzyme.shallow(<ObjectiveAccordionItem />)
    result.setProps({ objectiveID: faker.random.uuid() })

    const accordionButton = result
      .find('AccordionItem')
      .renderProp('children')({ isExpanded: true } as never)
      .find('ObjectiveAccordionButton')

    const expectedTag = {
      messages: {
        short: 'Médio',
        long: 'Média Confiança',
        icon: 'Um círculo amarelo, indicando que a confiançá é média',
        helper: 'Existe um risco de não alcançarmos o resultado-chave, mas seguimos otimistas',
      },
      color: {
        scheme: 'yellow',
        primary: 'yellow.500',
        light: 'yellow.50',
      },
    }

    expect(accordionButton.prop('confidenceTag')).toEqual(expectedTag)
  })
})
