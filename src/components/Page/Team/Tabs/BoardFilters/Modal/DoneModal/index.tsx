import React, { ChangeEvent } from 'react'

import styles from '../../filters.module.css'

interface DoneModalProperties {
  isOpen: boolean
  value?: string
  handleChange: (filter: string) => (event: ChangeEvent<HTMLInputElement>) => void
}

export const DoneModal = ({ isOpen, value, handleChange }: DoneModalProperties) => {
  return isOpen ? (
    <div className={styles.sub_modal_content}>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="donePeriod"
          value="1w"
          checked={value === '1w'}
          onChange={handleChange('showDone')}
        />
        <span>Semana atual</span>
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="donePeriod"
          value="2w"
          checked={value === '2w'}
          onChange={handleChange('showDone')}
        />
        <span>Quinzena atual</span>
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="donePeriod"
          value="4w"
          checked={value === '4w'}
          onChange={handleChange('showDone')}
        />
        <span>Mês atual</span>
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="donePeriod"
          value="none"
          checked={value === undefined}
          onChange={handleChange('showDone')}
        />
        <span>Ver todas</span>
      </label>
    </div>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
