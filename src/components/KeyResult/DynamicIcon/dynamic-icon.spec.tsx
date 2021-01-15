import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { defineMessage } from 'react-intl'
import * as recoil from 'recoil'
import sinon from 'sinon'

import DynamicIcon from './dynamic-icon'

const AVAILABLE_TEST_DRAWINGS = [
  'Activity',
  'Bookmark',
  'Calendar',
  'Delete',
  'Discovery',
  'Document',
  'EditSquare',
  'Folder',
  'Game',
  'Graph',
  'Heart',
  'Location',
  'Message',
  'Scan',
  'Search',
  'TicketStar',
  'TimesSquare',
  'Video',
  'Voice',
  'Wallet',
]

/* eslint-disable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */
const defaultFakeMessage = defineMessage({
  id: faker.random.uuid(),
  defaultMessage: faker.lorem.paragraph(),
})
/* eslint-enable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */
const defaultFakeIconName = faker.helpers.randomize(AVAILABLE_TEST_DRAWINGS)

const keyResultIconDrawingMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('DRAWING')
})
const keyResultIconDescMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('DESC')
})
const keyResultIconColorMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('COLOR')
})

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('selects the Icon based on the returning drawing for the title', () => {
    const fakeIconName = faker.helpers.randomize(AVAILABLE_TEST_DRAWINGS)
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(keyResultIconDrawingMatcher).returns(fakeIconName)
    stub.withArgs(keyResultIconDescMatcher).returns(defaultFakeMessage)

    const result = enzyme.shallow(<DynamicIcon title={faker.random.word()} />)

    // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    const icon = result.find(fakeIconName)

    expect(icon.length).toEqual(1)
  })

  it('uses the background color based on title', () => {
    const fakeColor = faker.random.word()
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(keyResultIconDrawingMatcher).returns(defaultFakeIconName)
    stub.withArgs(keyResultIconDescMatcher).returns(defaultFakeMessage)
    stub.withArgs(keyResultIconColorMatcher).returns(fakeColor)

    const result = enzyme.shallow(<DynamicIcon title={faker.random.word()} />)

    const box = result.find('Box')

    expect(box.prop('bg')).toEqual(fakeColor)
  })

  it('uses the procided desc value', () => {
    const fakeText = faker.lorem.paragraph()

    /* eslint-disable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */
    const fakeMessage = defineMessage({
      id: faker.random.uuid(),
      defaultMessage: fakeText,
    })
    /* eslint-enable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(keyResultIconDrawingMatcher).returns(defaultFakeIconName)
    stub.withArgs(keyResultIconDescMatcher).returns(fakeMessage)

    const result = enzyme.shallow(<DynamicIcon title={faker.random.word()} />)

    // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    const icon = result.find(defaultFakeIconName)

    expect(icon.prop('desc')).toEqual(fakeText)
  })
})
