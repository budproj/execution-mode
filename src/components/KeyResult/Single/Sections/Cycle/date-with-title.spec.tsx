import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { defineMessage } from 'react-intl'

import DateWithTitle from './date-with-title'

/* eslint-disable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */
const fakeLabel = defineMessage({
  id: faker.random.uuid(),
  defaultMessage: faker.random.word(),
})
/* eslint-enable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */

describe('component render', () => {
  it('renders a provided date accordingly', () => {
    const fakeDate = new Date('2020-12-12T12:00:00')

    const result = enzyme.shallow(<DateWithTitle date={fakeDate} label={fakeLabel} />)

    const date = result.find('Text').at(1)

    expect(date.text()).toEqual('12/12/2020')
  })

  it('renders a provided label accordingly', () => {
    const result = enzyme.shallow(<DateWithTitle label={fakeLabel} />)

    const date = result.find('Text').first()

    expect(date.text()).toEqual(fakeLabel.defaultMessage)
  })
})
