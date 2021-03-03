import faker from 'faker'

import buildSkeletonMinSize from './build-skeleton-min-size'

describe('builder', () => {
  it('returns "auto" for width if data is loaded', () => {
    const result = buildSkeletonMinSize(true, faker.random.number(), faker.random.number())

    expect(result.width).toEqual('full')
  })

  it('returns "auto" for height if data is loaded', () => {
    const result = buildSkeletonMinSize(true, faker.random.number(), faker.random.number())

    expect(result.height).toEqual('full')
  })

  it('returns provided normalized width if data is not loaded', () => {
    const width = faker.random.number()

    const result = buildSkeletonMinSize(false, width, faker.random.number())
    const expectedWidth = `${width}px`

    expect(result.width).toEqual(expectedWidth)
  })

  it('returns provided normalized height if data is not loaded', () => {
    const height = faker.random.number()

    const result = buildSkeletonMinSize(false, faker.random.number(), height)
    const expectedHeight = `${height}px`

    expect(result.height).toEqual(expectedHeight)
  })

  it('returns a random number between half of width and width if data is not loaded and it set to dynamic', () => {
    const width = faker.random.number()

    const result = buildSkeletonMinSize(false, width, faker.random.number())
    const resultWidth = result.width as string
    const resultWidthValue = Number(resultWidth.split('px')[0])

    expect(resultWidthValue).toBeLessThanOrEqual(width)
    expect(resultWidthValue).toBeGreaterThanOrEqual(width / 2)
  })

  it('returns a random number between half of height and height if data is not loaded and it set to dynamic', () => {
    const height = faker.random.number()

    const result = buildSkeletonMinSize(false, faker.random.number(), height)
    const resultHeight = result.height as string
    const resultHeightValue = Number(resultHeight.split('px')[0])

    expect(resultHeightValue).toBeLessThanOrEqual(height)
    expect(resultHeightValue).toBeGreaterThanOrEqual(height / 2)
  })
})

describe('customizations', () => {
  it('can customize the loaded width', () => {
    const desiredLoadedWidth = faker.random.word()
    const result = buildSkeletonMinSize(true, faker.random.number(), faker.random.number(), {
      loadedWidth: desiredLoadedWidth,
    })

    expect(result.width).toEqual(desiredLoadedWidth)
  })

  it('can customize the loaded height', () => {
    const desiredLoadedHeight = faker.random.word()
    const result = buildSkeletonMinSize(true, faker.random.number(), faker.random.number(), {
      loadedHeight: desiredLoadedHeight,
    })

    expect(result.width).toEqual(desiredLoadedHeight)
  })
})
