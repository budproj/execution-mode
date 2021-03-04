import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import * as hook from './hook'

// eslint-disable-next-line unicorn/no-null
const FakeDummy = (_properties: hook.ConfidenceTag) => null

interface FakeComponentInterface {
  confidence?: number
}

const FakeComponent = ({ confidence }: FakeComponentInterface) => {
  const [confidenceTag] = hook.useConfidenceTag(confidence)

  return <FakeDummy {...confidenceTag} />
}

describe('confidence tag getter', () => {
  it('returns the expected "high" tag if current confidence is 67 or more', () => {
    const fakeConfidence = faker.random.number({ min: 67 })

    const result = enzyme.shallow(<FakeComponent confidence={fakeConfidence} />)

    const expectedTag = {
      messages: {
        short: 'Alto',
        long: 'Alta Confiança',
        icon: 'Um círculo verde, indicando que a confiança está alta',
        helper: 'Se tudo continuar assim, esperamos alcançar o resultado',
      },
      color: {
        scheme: 'green',
        primary: 'green.500',
        light: 'green.50',
      },
    }

    const dummy = result.find('FakeDummy')

    expect(dummy.props()).toMatchObject(expectedTag)
  })

  it('returns the expected "medium" tag if current confidence is less than 66 and equal/higher than 33', () => {
    const fakeConfidence = faker.random.number({ min: 33, max: 66 })

    const result = enzyme.shallow(<FakeComponent confidence={fakeConfidence} />)

    const expectedTag = {
      messages: {
        short: 'Médio',
        long: 'Média Confiança',
        icon: 'Um círculo amarelo, indicando que a confiançá é média',
        helper: 'Existe um risco de não alcançarmos, mas seguimos otimistas',
      },
      color: {
        scheme: 'yellow',
        primary: 'yellow.500',
        light: 'yellow.50',
      },
    }

    const dummy = result.find('FakeDummy')

    expect(dummy.props()).toMatchObject(expectedTag)
  })

  it('returns the expected "low" tag if the current confidence is 32 and equal/higher than 0', () => {
    const fakeConfidence = faker.random.number({ min: 0, max: 32 })

    const result = enzyme.shallow(<FakeComponent confidence={fakeConfidence} />)

    const expectedTag = {
      messages: {
        short: 'Baixo',
        long: 'Baixa Confiança',
        icon: 'Um círculo vermelho, indicando que a confiança está baixa',
        helper: 'Não vamos alcançar o resultado a não ser que a gente mude nossos planos',
      },
      color: {
        scheme: 'red',
        primary: 'red.500',
        light: 'red.50',
      },
    }

    const dummy = result.find('FakeDummy')

    expect(dummy.props()).toMatchObject(expectedTag)
  })

  it('returns the expected "barrier" tag if the current confidence is -1 or less', () => {
    const fakeConfidence = faker.random.number({ max: -1 })

    const result = enzyme.shallow(<FakeComponent confidence={fakeConfidence} />)

    const expectedTag = {
      messages: {
        short: 'Com Barreira',
        long: 'Com Barreira',
        icon: 'Um círculo roxo, indicando que o resultado-chave tem uma barreira',
        helper: 'Existe um fator externo impedindo o progresso desse resultado-chave',
      },
      color: {
        scheme: 'purple',
        primary: 'purple.500',
        light: 'purple.50',
      },
    }

    const dummy = result.find('FakeDummy')

    expect(dummy.props()).toMatchObject(expectedTag)
  })

  it('returns the expected "high" tag if current confidence is not defined', () => {
    const result = enzyme.shallow(<FakeComponent />)

    const expectedTag = {
      messages: {
        short: 'Alto',
        long: 'Alta Confiança',
        icon: 'Um círculo verde, indicando que a confiança está alta',
        helper: 'Se tudo continuar assim, esperamos alcançar o resultado',
      },
      color: {
        scheme: 'green',
        primary: 'green.500',
        light: 'green.50',
      },
    }

    const dummy = result.find('FakeDummy')

    expect(dummy.props()).toMatchObject(expectedTag)
  })
})

describe('normalize confidence', () => {
  it('returns 100 for confidences within the range of the HIGH tag', () => {
    const fakeConfidence = faker.random.number({ min: 67, max: 100 })

    const result = hook.normalizeConfidence(fakeConfidence)

    expect(result).toEqual(100)
  })

  it('returns 49 for confidences within the range of the MEDIUM tag', () => {
    const fakeConfidence = faker.random.number({ min: 33, max: 66 })

    const result = hook.normalizeConfidence(fakeConfidence)

    expect(result).toEqual(66)
  })

  it('returns 24 for confidences within the range of the LOW tag', () => {
    const fakeConfidence = faker.random.number({ min: 0, max: 32 })

    const result = hook.normalizeConfidence(fakeConfidence)

    expect(result).toEqual(32)
  })

  it('returns 24 for confidences within the range of the LOW tag if confidence was 0', () => {
    const result = hook.normalizeConfidence(0)

    expect(result).toEqual(32)
  })

  it('returns -1 for confidences within the range of the BARRIER tag', () => {
    const fakeConfidence = faker.random.number({ max: -1 })

    const result = hook.normalizeConfidence(fakeConfidence)

    expect(result).toEqual(-1)
  })

  it('returns 100 for undefined confidence values', () => {
    const result = hook.normalizeConfidence()

    expect(result).toEqual(100)
  })
})
