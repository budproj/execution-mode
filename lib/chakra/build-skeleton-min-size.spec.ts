import faker from 'faker'

import buildSkeletonMinSize from './build-skeleton-min-size'

describe('builder', () => {
  it('returns "auto" for width if data is loaded', () => {
    const result = buildSkeletonMinSize(true, faker.random.number(), faker.random.number())

    expect(result.width).toEqual('auto')
  })

  it('returns "auto" for height if data is loaded', () => {
    const result = buildSkeletonMinSize(true, faker.random.number(), faker.random.number())

    expect(result.height).toEqual('auto')
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
    const widthResult = Number(result.width.split('px')[0])

    expect(widthResult).toBeLessThanOrEqual(width)
    expect(widthResult).toBeGreaterThanOrEqual(width / 2)
  })

  it('returns a random number between half of height and height if data is not loaded and it set to dynamic', () => {
    const height = faker.random.number()

    const result = buildSkeletonMinSize(false, faker.random.number(), height)
    const heightResult = Number(result.height.split('px')[0])

    expect(heightResult).toBeLessThanOrEqual(height)
    expect(heightResult).toBeGreaterThanOrEqual(height / 2)
  })
})
