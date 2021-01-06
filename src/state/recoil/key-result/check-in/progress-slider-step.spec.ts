import faker from 'faker'
import sinon from 'sinon'

import { KEY_RESULT_FORMAT } from 'src/components/KeyResult/constants'

import * as progressSliderStep from './progress-slider-step'

describe('progressSliderStep getter', () => {
  it('returns 1 if no key result format is defined', () => {
    const selector = progressSliderStep.getStepBasedOnID(faker.random.word())

    const result = selector({ get: sinon.fake() })

    expect(result).toEqual(1)
  })

  it('returns 1 if the key result format is NUMBER', () => {
    const format = KEY_RESULT_FORMAT.NUMBER
    const stub = sinon.stub().returns(format)
    const selector = progressSliderStep.getStepBasedOnID(faker.random.word())

    const result = selector({ get: stub })

    expect(result).toEqual(1)
  })

  it('returns 1 if the key result format is COIN_BRL', () => {
    const format = KEY_RESULT_FORMAT.COIN_BRL
    const stub = sinon.stub().returns(format)
    const selector = progressSliderStep.getStepBasedOnID(faker.random.word())

    const result = selector({ get: stub })

    expect(result).toEqual(1)
  })

  it('returns 0.01 if the key result format is PERCENTAGE', () => {
    const format = KEY_RESULT_FORMAT.PERCENTAGE
    const stub = sinon.stub().returns(format)
    const selector = progressSliderStep.getStepBasedOnID(faker.random.word())

    const result = selector({ get: stub })

    expect(result).toEqual(1)
  })
})
