import { selector } from 'recoil'

import userIDAtom from 'state/atoms/user/id'

export default selector({
  key: 'USER::CUSTOM_SORTING::KEY_RESULTS',
  get: async ({ get }) => {
    const userID = get(userIDAtom)

    return fetch(`/api/users/${userID}/custom-sorting/key-results`).then((res) => res.json())
  },
})
