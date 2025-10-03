import { Spinner } from '@chakra-ui/react'
import React, { ChangeEvent, useMemo, useState } from 'react'

import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import { useTeamKRData } from 'src/components/KeyResult/hooks/use-get-team-key-result'
import {
  KeyResult,
  KeyResultFormat,
  KeyResultMode,
  KeyResultType,
} from 'src/services/key-result/@types'

import styles from '../../filters.module.css'

interface KeyResultModalProperties {
  isOpen: boolean
  teamId: string
  cycleFilter: string
  value?: string
  handleChange: (filter: string) => (event: ChangeEvent<HTMLInputElement>) => void
}

export const KeyResultModal = ({
  isOpen,
  value,
  teamId,
  cycleFilter,
  handleChange,
}: KeyResultModalProperties) => {
  const [search, setSearch] = useState<string>('')

  const { data: KeyResultData, isFetching: krFetching } = useTeamKRData(teamId, cycleFilter)

  const KeyResult = useMemo(() => {
    // Solução não inteligente, mas funcional por enquanto
    const EmptyKeyResult: KeyResult = {
      id: 'empty',
      title: 'Tarefas sem Resultado-Chave',
      goal: 100,
      initialValue: 0,
      description: '',
      format: KeyResultFormat.NUMBER,
      objectiveId: '',
      team: '',
      ownerId: '',
      type: KeyResultType.ASCENDING,
      mode: KeyResultMode.PUBLISHED,
      commentCount: JSON.parse('{}'),
      createdAt: new Date(),
      updatedAt: new Date(),
      lastUpdatedBy: '',
    }
    return [EmptyKeyResult, ...(KeyResultData?.filter((kr) => kr.title.includes(search)) ?? [])]
  }, [KeyResultData, search])

  return isOpen ? (
    <div className={styles.sub_modal_content}>
      <SearchBar marginBottom="10px" placeholder="Buscar resultado-chave" onSearch={setSearch} />
      {krFetching ? (
        <Spinner size="xl" color="black.100" />
      ) : KeyResult?.length === 0 ? (
        <h1 className={styles.no_kr_text}>Nenhum Resultado-chave Encontrado</h1>
      ) : (
        KeyResult?.map((kr) => (
          <label key={kr.id} className={styles.checkbox}>
            <input
              type="checkbox"
              name="krSelector"
              value={kr.id}
              checked={value === kr.id}
              onChange={handleChange('kr')}
            />
            <span>{kr.title}</span>
          </label>
        ))
      )}
    </div>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
