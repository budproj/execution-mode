import faker from 'faker'

import { DRAWINGS_AVAILABLE, COLORS_AVAILABLE } from './constants'
import * as selectors from './selectors'

describe('icon drawing', () => {
  it('returns an expected drawing based on static title', () => {
    const staticTitle = 'Rick Sanchez'
    const getter = selectors.getIconDrawingBasedOnTitle(staticTitle)

    const result = getter()

    expect(result).toEqual(DRAWINGS_AVAILABLE[1])
  })
})

describe('icon color', () => {
  it('returns an expected color based on static title', () => {
    const staticTitle = 'Rick Sanchez'
    const getter = selectors.getIconColorBasedOnTitle(staticTitle)

    const result = getter()

    expect(result).toEqual(COLORS_AVAILABLE[1])
  })
})

describe('icon desc', () => {
  it('returns an expected desc based on static drawing', () => {
    const staticDrawing = 'Activity'
    const descGroup = {
      Activity: faker.random.word(),
    }
    const selector = selectors.getDescBasedOnDrawing(descGroup as any)
    const getter = selector(staticDrawing)

    const result = getter()

    expect(result).toEqual(descGroup.Activity)
  })
})
