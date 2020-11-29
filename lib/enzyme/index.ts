import enzyme from 'enzyme'
import { ReactElement } from 'react'
import { IntlProvider } from 'react-intl'
import { OptionalIntlConfig } from 'react-intl/src/components/provider'
import { RecoilRoot } from 'recoil'

import messages from '../../compiled-lang/pt-BR.json'

const defaultLocale = 'pt-BR'
const locale = defaultLocale

export const shallowWithIntl = (element: ReactElement) =>
  enzyme.shallow(element, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages,
    },
  })

export const mountWithIntl = (element: ReactElement, options?: Partial<OptionalIntlConfig>) =>
  enzyme.mount(element, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages,
      ...options,
    },
  })

export const mountWithRecoil = (element: ReactElement) =>
  enzyme.mount(element, {
    wrappingComponent: RecoilRoot,
  })

export default {
  shallowWithIntl,
  mountWithIntl,
  mountWithRecoil,
}
