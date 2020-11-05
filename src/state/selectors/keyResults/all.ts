import { selector } from 'recoil'

export default selector({
  key: 'KEY_RESULTS::ALL',
  get: async () => fetch('/api/key-results').then((res) => res.json()),
})
