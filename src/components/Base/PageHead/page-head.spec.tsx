import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { defineMessage } from 'react-intl'

import PageHead from './page-head'

describe('component renderization', () => {
  it('renders a provided title', () => {
    const fakeTitle = faker.random.word()

    /* eslint-disable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */
    const titleMessage = defineMessage({
      id: faker.random.uuid(),
      defaultMessage: fakeTitle,
    })
    /* eslint-enable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */

    const result = enzyme.shallow(<PageHead title={titleMessage} />)

    const title = result.find('title')

    expect(title.text()).toEqual(fakeTitle)
  })

  it('renders a provided title with variables', () => {
    const fakeTitle = faker.random.word()
    const fakeVar = faker.random.word()
    const fakeDefaultMessage = `{var} ${fakeTitle}`

    /* eslint-disable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */
    const titleMessage = defineMessage({
      id: faker.random.uuid(),
      defaultMessage: fakeDefaultMessage,
    })
    /* eslint-enable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */

    const result = enzyme.shallow(<PageHead title={titleMessage} titleValues={{ var: fakeVar }} />)

    const title = result.find('title')
    const expectedTitle = `${fakeVar} ${fakeTitle}`

    expect(title.text()).toEqual(expectedTitle)
  })

  it('renders a provided description', () => {
    const fakeDescription = faker.lorem.paragraph()

    /* eslint-disable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */
    const descriptionMessage = defineMessage({
      id: faker.random.uuid(),
      defaultMessage: fakeDescription,
    })
    /* eslint-enable formatjs/enforce-description, formatjs/enforce-id, formatjs/enforce-default-message */

    const result = enzyme.shallow(<PageHead description={descriptionMessage} />)

    const meta = result.find('meta')

    expect(meta.prop('content')).toEqual(fakeDescription)
  })

  it('renders a default title if none was provided', () => {
    const result = enzyme.shallow(<PageHead />)

    const title = result.find('title')

    expect(title.text()).toEqual('Bud')
  })

  it('renders a default description if none was provided', () => {
    const result = enzyme.shallow(<PageHead />)

    const meta = result.find('meta')

    expect(meta.prop('content')).toEqual('Bud é uma plataforma para gerenciamento de OKRs.')
  })
})
