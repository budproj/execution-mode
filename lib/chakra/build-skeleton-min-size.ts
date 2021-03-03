import { SkeletonProps } from '@chakra-ui/skeleton'
import deepmerge from 'deepmerge'
import random from 'lodash/random'

export interface BuildSkeletonMinSizeOptions {
  loadedWidth?: SkeletonProps['width']
  loadedHeight?: SkeletonProps['height']
  dynamic?: boolean
}

const defaultOptions: BuildSkeletonMinSizeOptions = {
  loadedWidth: 'full',
  loadedHeight: 'full',
}

const buildSkeletonMinSize = (
  isLoaded: boolean,
  maxWidth: number,
  maxHeight: number,
  providedOptions?: BuildSkeletonMinSizeOptions,
) => {
  const options = deepmerge(defaultOptions, providedOptions ?? {})
  const width = options?.dynamic ? random(maxWidth / 2, maxWidth) : maxWidth
  const height = maxHeight

  return {
    width: isLoaded ? options.loadedWidth : `${width}px`,
    height: isLoaded ? options.loadedHeight : `${height}px`,
  }
}

export default buildSkeletonMinSize
