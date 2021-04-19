import { useEffect, useState } from 'react'

import { LocalFileDataHook } from './types'

export const useLocalFileData = (initialFile?: File): LocalFileDataHook => {
  const [file, setFile] = useState(initialFile)
  const [loading, setLoading] = useState<boolean>()
  const [localFileData, setLocalFileData] = useState<string>()

  const handleLoad = (localData: string) => {
    console.log(localData, 'tag')
    setLocalFileData(localData)
    setLoading(false)
  }

  const handleReset = () => {
    /* eslint-disable unicorn/no-useless-undefined */
    setLocalFileData(undefined)
    setFile(undefined)
    /* eslint-enable unicorn/no-useless-undefined */
    setLoading(false)
  }

  useEffect(() => {
    if (file) {
      setLoading(true)

      const reader = new FileReader()
      reader.addEventListener('load', () => handleLoad(reader.result as string), false)
      reader.readAsDataURL(file)
    }
  }, [file, setLoading, setLocalFileData])

  return [localFileData, loading, setFile, handleReset]
}
