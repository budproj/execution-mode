import { Loadable } from 'recoil'

const hasFetchedAllValues = (...recoilLoadableComponents: Loadable<unknown>[]): boolean =>
  recoilLoadableComponents.every((component: Loadable<unknown>) => component.state === 'hasValue')

export default hasFetchedAllValues
