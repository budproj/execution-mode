import { Dispatch, SetStateAction } from 'react'

export type LocalFileDataHook = [
  string | undefined,
  boolean | undefined,
  Dispatch<SetStateAction<File | undefined>>,
  () => void,
]
