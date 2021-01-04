import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { defineMessage } from 'react-intl'
import * as recoil from 'recoil'
import sinon from 'sinon'

import ConfidenceTag from './confidence-tag'

describe('component render', () => {
  afterEach(() => sinon.restore())

  /* eslint-disable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */
  const fakeMessage = defineMessage({
    id: faker.random.uuid(),
    defaultMessage: faker.lorem.paragraph(),
  })

  const fakeDesc = defineMessage({
    id: faker.random.uuid(),
    defaultMessage: faker.lorem.paragraph(),
  })
  /* eslint-enable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */

  it('renders the circle with provided confidence tag color', () => {
    const fakeColor = faker.random.word()
    const fakeTag = {
      color: fakeColor,
      message: fakeMessage,
      desc: fakeDesc,
    }
    sinon.stub(recoil, 'useRecoilValue').returns(fakeTag)
    sinon.mock(console).expects('error').atLeast(1)

    const result = enzyme.shallow(<ConfidenceTag />)

    const circle = result.find('Circle')

    expect(circle.prop('fill')).toEqual(fakeColor)
  })

  it('renders the provided confidence tag message', () => {
    const fakeTag = {
      message: fakeMessage,
      desc: fakeDesc,
    }
    sinon.stub(recoil, 'useRecoilValue').returns(fakeTag)
    sinon.mock(console).expects('error').atLeast(1)

    const result = enzyme.shallow(<ConfidenceTag />)

    const text = result.find('Text')

    expect(text.text()).toEqual(fakeMessage.defaultMessage)
  })
})
