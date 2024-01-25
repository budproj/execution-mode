import { useCallback, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { useGetKeyResults } from 'src/components/KeyResult/hooks/getKeyResults/get-key-results'
import { krTableLengthAtom } from 'src/state/recoil/key-result/kr-table-lenght.atom'
import loadedKeyResults from 'src/state/recoil/key-result/pagination/fetch-more-key-results'
import paginationKRs, { KRS_PER_PAGE } from 'src/state/recoil/key-result/pagination/limit-offset'
import listKeyResultsPageInfo from 'src/state/recoil/key-result/pagination/load-key-results-page-info'

type usePagitionOuput = {
  krTableLength: number
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
  isCompany?: boolean
}

const usePagination = ({ onClose, isCompany }: usePaginationProperties): usePagitionOuput => {
  const { fetchMoreKeyResults: fetchMore, loading: loadingData } = useGetKeyResults(isCompany)
  const data = useRecoilValue(loadedKeyResults)
  const [krTableLength, setTableLength] = useRecoilState(krTableLengthAtom)
  const setPaginationVariables = useSetRecoilState(paginationKRs)
  const { hasNextPage } = useRecoilValue(listKeyResultsPageInfo)
  const [lastKrListed, setLastKrListed] = useState({
    firstListElement: 0,
    lastListElement: KRS_PER_PAGE,
  })

  const keyResultIds = useMemo(() => {
    return data
      .slice(lastKrListed.firstListElement, lastKrListed.lastListElement)
      .map(({ id }) => id)
  }, [data, lastKrListed])

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
        setPaginationVariables({
          limit: KRS_PER_PAGE,
          offset: data.length,
        })
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
  }, [data, fetchMore, keyResultIds, setPaginationVariables])

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
    !loadingData && (hasNextPage || data.length > lastKrListed.lastListElement)
  console.log({ loadingData, lastKrListed, data, hasNextPage, showNextPageButton })

  return {
    krTableLength,
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
