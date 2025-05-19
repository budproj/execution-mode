import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  Button,
  Text,
} from '@chakra-ui/react'
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { useIntl } from 'react-intl'

import messages from './messages'

interface AchivedKeyResultModalProperties {
  isOpen: boolean
  handleClose: () => void
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const canvasStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
}

function getAnimationSettings(originXA: number, originXB: number) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
    colors: ['#6F6EFF', '#24CB8D', '#F1BF25', '#FF616A', '#C26EFF', '#8491B0'],
  }
}

export const AchivedKeyResultModal = ({ isOpen, handleClose }: AchivedKeyResultModalProperties) => {
  const intl = useIntl()

  const referenceAnimationInstance = useRef(null)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()

  const getInstance = useCallback((instance: any) => {
    referenceAnimationInstance.current = instance
  }, [])

  const nextTickAnimation = useCallback(() => {
    if (referenceAnimationInstance.current) {
      ;(referenceAnimationInstance.current as any)(getAnimationSettings(0.1, 0.7))
      // ReferenceAnimationInstance.current(getAnimationSettings(0.7, 0.9))
    }
  }, [])

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 1000))
    }
  }, [intervalId, nextTickAnimation])

  const stopAnimation = useCallback(() => {
    clearInterval(intervalId)
    // eslint-disable-next-line unicorn/no-useless-undefined
    setIntervalId(undefined)
    ;(referenceAnimationInstance.current as any | null)?.reset()
  }, [intervalId])

  useEffect(() => {
    return () => {
      clearInterval(intervalId)
    }
  }, [intervalId])

  const close = () => {
    handleClose()
    stopAnimation()
  }

  useEffect(() => {
    if (isOpen) startAnimation()
  }, [isOpen, startAnimation])

  return (
    <Modal
      autoFocus
      id="2433243"
      returnFocusOnClose={false}
      isOpen={isOpen}
      size="100%"
      onClose={close}
    >
      <ModalOverlay zIndex={999} />
      <ModalContent paddingY="40px" paddingX="30px" maxW="40em" borderRadius="10px">
        <ModalHeader as={Flex} flexDirection="column" alignItems="center" justifyContent="center">
          <Image src="/images/confetti.png" alt="Confetti" width={124} height={124} />
          <Heading
            color="new-gray.900"
            fontWeight={500}
            textAlign="center"
            fontSize="25px"
            marginTop="5px"
          >
            {intl.formatMessage(messages.congratulationsTitle)}
          </Heading>
        </ModalHeader>

        <ModalBody>
          <Text color="new-gray.700" textAlign="center" fontSize="16px">
            {intl.formatMessage(messages.congratulationsContent)}
          </Text>
          <ReactCanvasConfetti zIndex={1000} refConfetti={getInstance} style={canvasStyles} />
        </ModalBody>

        <ModalFooter>
          <Button
            borderRadius="4px"
            width="100%"
            bg="brand.500"
            color="black.50"
            _hover={{ background: 'brand.400', color: 'black.50' }}
            onClick={handleClose}
          >
            {intl.formatMessage(messages.closeButton)}
          </Button>
        </ModalFooter>
      </ModalContent>

      {/* <Flex>
        <StyledImage src="/images/praisal.png" alt="asdsa" width={22} height={22} />
      </Flex> */}
    </Modal>
  )
}
