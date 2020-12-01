import enzyme from 'enzyme'
import { Formik } from 'formik'
import React, { ReactElement } from 'react'
import { act } from 'react-dom/test-utils'
import { IntlProvider } from 'react-intl'
import { OptionalIntlConfig } from 'react-intl/src/components/provider'
import { RecoilRoot } from 'recoil'
import sinon from 'sinon'

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

export const shallowWithRecoil = (element: ReactElement) =>
  enzyme.shallow(element, {
    wrappingComponent: RecoilRoot,
  })

export const mountWithRecoil = (element: ReactElement) =>
  enzyme.mount(element, {
    wrappingComponent: RecoilRoot,
  })

export async function wait(amount = 0) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, amount))
}

export async function actWait(amount = 0) {
  await act(async () => {
    await wait(amount)
  })
}

interface FakeFormikWrapper {
  children: ReactElement
}

export const FakeFormikWrapper = ({ children }: FakeFormikWrapper) => (
  <Formik initialValues={{}} onSubmit={sinon.fake()}>
    {children}
  </Formik>
)

export default {
  shallowWithIntl,
  mountWithIntl,
  shallowWithRecoil,
  mountWithRecoil,
  wait,
  actWait,
  FakeFormikWrapper,
}
