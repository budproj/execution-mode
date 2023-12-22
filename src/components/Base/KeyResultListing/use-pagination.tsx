import { useCallback, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { useGetKeyResults } from 'src/components/KeyResult/hooks/getKeyResults/get-key-results'
import { KeyResult } from 'src/components/KeyResult/types'
import { krTableLengthAtom } from 'src/state/recoil/key-result/kr-table-lenght.atom'
import loadedKeyResults from 'src/state/recoil/key-result/pagination/fetch-more-key-results'
import { KRS_PER_PAGE } from 'src/state/recoil/key-result/pagination/limit-offset'

type krListMeta = {
  firstListElement: number
  lastListElement: number
}

type usePagitionOuput = {
  krTableLength: number
  lastKrListed: krListMeta
  dataToRender: KeyResult[]
  showPreviousPageButton: boolean
  showNextPageButton: boolean
  keyResultIds: string[]
  isLoading: boolean
  loadedKrTableLength: number
  handleCloseModal: () => void
  loadNextKrsPage: () => Promise<void>
  loadPreviousKrsPage: () => void
}

interface usePaginationProperties {
  onClose: () => void
}

const usePagination = ({ onClose }: usePaginationProperties): usePagitionOuput => {
  const { fetchMoreKeyResults: fetchMore, loading: loadingData } = useGetKeyResults()
  const data = useRecoilValue(loadedKeyResults)
  const [krTableLength, setTableLength] = useRecoilState(krTableLengthAtom)
  const [lastKrListed, setLastKrListed] = useState({
    firstListElement: 0,
    lastListElement: KRS_PER_PAGE,
  })

  const dataToRender = useMemo(() => {
    return data.slice(lastKrListed.firstListElement, lastKrListed.lastListElement)
  }, [data, lastKrListed])

  const keyResultIds = useMemo(() => dataToRender.map(({ id }) => id), [dataToRender])

  const handleCloseModal = () => {
    void onClose()
    setTableLength(0)
    setLastKrListed({ firstListElement: 0, lastListElement: KRS_PER_PAGE })
  }

  const loadNextKrsPage = useCallback(async () => {
    if (fetchMore) {
      const lastRenderedIndex = data.findIndex(
        (kr) => kr.id === keyResultIds[keyResultIds.length - 1],
      )
      const lastDataIndex = data.indexOf(data[data.length - 1])
      const mustFetchMore = lastRenderedIndex === lastDataIndex
      if (mustFetchMore) {
        await fetchMore({
          limit: KRS_PER_PAGE,
          offset: data.length,
        })
      }

      setLastKrListed({
        firstListElement: lastRenderedIndex + 1,
        lastListElement: lastRenderedIndex + KRS_PER_PAGE + 1,
      })
    }
  }, [data, fetchMore, keyResultIds])

  const loadPreviousKrsPage = () => {
    const firstRenderedIndex = data.findIndex((kr) => kr.id === keyResultIds[0])

    setLastKrListed({
      firstListElement: firstRenderedIndex - KRS_PER_PAGE,
      lastListElement: firstRenderedIndex,
    })
  }

  const firstListKeyResultIndex = useMemo(
    () => data.findIndex((kr) => kr.id === keyResultIds[0]),
    [data, keyResultIds],
  )

  const showPreviousPageButton =
    !loadingData && firstListKeyResultIndex > 0 && keyResultIds.length < data.length

  const showNextPageButton =
    !loadingData &&
    krTableLength > 0 &&
    (krTableLength > data.length ||
      (data.length === krTableLength && krTableLength > lastKrListed.lastListElement))

  return {
    krTableLength,
    lastKrListed,
    dataToRender,
    showPreviousPageButton,
    showNextPageButton,
    keyResultIds,
    isLoading: loadingData,
    loadedKrTableLength: data.length,
    handleCloseModal,
    loadNextKrsPage,
    loadPreviousKrsPage,
  }
}

export default usePagination
