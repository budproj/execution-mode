import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

export interface NoSSRProperties {
  children: ReactElement
}

const NoSSR = ({ children }: NoSSRProperties) => children

export default dynamic(async () => Promise.resolve(NoSSR), {
  ssr: false,
})
