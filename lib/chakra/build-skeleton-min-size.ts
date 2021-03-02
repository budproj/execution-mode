import random from 'lodash/random'

export interface BuildSkeletonMinSizeOptions {
  dynamic?: boolean
}

const buildSkeletonMinSize = (
  isLoaded: boolean,
  maxWidth: number,
  maxHeight: number,
  options?: BuildSkeletonMinSizeOptions,
) => {
  const width = options?.dynamic ? random(maxWidth / 2, maxWidth) : maxWidth
  const height = maxHeight

  return {
    width: isLoaded ? 'full' : `${width}px`,
    height: isLoaded ? 'full' : `${height}px`,
  }
}

export default buildSkeletonMinSize
