import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import ChevronDownIcon from 'src/components/Icon/ChevronDown'

import { FilterModal } from './Modal'
import styles from './filters.module.css'
import messages from './messages'

interface BoardFiltersProperties {
  teamId: string
}

export interface FiltersData {
  kr?: string
  cycle?: {
    year?: string
    quarter?: string
  }
  showDone?: string
}

export const BoardFilters = ({ teamId }: BoardFiltersProperties) => {
  const intl = useIntl()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [filterData, setFilterData] = useState<FiltersData>({
    kr: undefined,
    cycle: {
      year: undefined,
      quarter: undefined,
    },
    showDone: undefined,
  })

  // Update site Query Params
  const handleQuery = (key: string, newValue?: string) => {
    router.query[key] = newValue === 'none' ? undefined : newValue
    router.push(router, undefined, { shallow: true })
    return true
  }

  const checkQuery = (index: string) => {
    return router.query[index] === '' || router.query[index] === 'none'
      ? undefined
      : (router.query[index] as string)
  }

  useEffect(() => {
    const cycle = checkQuery('cy')

    setFilterData({
      kr: checkQuery('key_result_id'),
      cycle: {
        year: cycle && cycle.length > 0 ? cycle.split('+')[0].replace(/\s/g, '') : undefined,
        quarter: cycle && cycle.length > 1 ? cycle.split('+')[1].replace(/\s/g, '') : undefined,
      },
      showDone: checkQuery('show_done'),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  return (
    <div>
      <button
        className={styles.modal_button}
        style={{ backgroundColor: isOpen ? '#F1F1FF' : 'transparent' }}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
      >
        <p className={styles.modal_text}>Filtros</p>
        <ChevronDownIcon
          desc={intl.formatMessage(messages.iconChevronUpDesc)}
          fontSize="xs"
          stroke="brand.500"
          transition="0.2s all ease-in"
        />
      </button>
      <FilterModal
        filterData={filterData}
        isOpen={isOpen}
        teamId={teamId}
        setFilterData={setFilterData}
        handleQuery={handleQuery}
      />
    </div>
  )
}
