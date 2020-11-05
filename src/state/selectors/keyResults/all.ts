import { selector } from 'recoil'

import { KeyResultsHashmap, KeyResult } from 'components/KeyResult'

const reduceToID = (prev: KeyResultsHashmap, next: KeyResult): KeyResultsHashmap => ({
  ...prev,
  [next.id]: next,
})

export default selector({
  key: 'KEY_RESULTS::ALL',
  get: async () =>
    fetch('/api/key-results')
      .then((res) => res.json())
      .then((result) => result.data.reduce(reduceToID, {})),
})
