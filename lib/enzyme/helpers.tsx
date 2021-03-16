import React, { useEffect, useState } from 'react'
import { act } from 'react-dom/test-utils'
import { useRecoilSnapshot } from 'recoil'

// eslint-disable-next-line unicorn/no-null
const RecoilSpyAnchor = (_properties: any) => null

export const RecoilSpy = () => {
  const [nodes, setNodes] = useState({})
  const snapshot = useRecoilSnapshot()

  useEffect(() => {
    let newNodes = nodes

    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      newNodes = {
        ...newNodes,
        [node.key]: snapshot.getLoadable(node).contents,
      }
    }

    setNodes(newNodes)
  }, [snapshot, nodes, setNodes])

  return <RecoilSpyAnchor {...nodes} />
}

export const waitForComponentToPaint = async (wrapper: any) => {
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0)
    })
    wrapper.update()
  })
}
