import faker from 'faker'
import sinon from 'sinon'

import { KeyResultFormat } from 'src/components/KeyResult/types'

import * as step from './step'

describe('step getter', () => {
  it('returns 1 if no key result format is defined', () => {
    const selector = step.getStepBasedOnID(faker.random.word())

    const result = selector({ get: sinon.fake() })

    expect(result).toEqual(1)
  })

  it('returns 1 if the key result format is NUMBER', () => {
    const format = KeyResultFormat.NUMBER
    const stub = sinon.stub().returns(format)
    const selector = step.getStepBasedOnID(faker.random.word())

    const result = selector({ get: stub })

    expect(result).toEqual(1)
  })

  it('returns 1 if the key result format is COIN_BRL', () => {
    const format = KeyResultFormat.COIN_BRL
    const stub = sinon.stub().returns(format)
    const selector = step.getStepBasedOnID(faker.random.word())

    const result = selector({ get: stub })

    expect(result).toEqual(1)
  })

  it('returns 0.01 if the key result format is PERCENTAGE', () => {
    const format = KeyResultFormat.PERCENTAGE
    const stub = sinon.stub().returns(format)
    const selector = step.getStepBasedOnID(faker.random.word())

    const result = selector({ get: stub })

    expect(result).toEqual(1)
  })
})
