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
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface AchivedKeyResultModalProperties {
  isOpen: boolean
  handleClose: () => void
}

// Const StyledImage = styled(Image)`
//   width: 30px;
//   height: 30px;
//   position: absolute;
//   top: 0;
//   animation: confettiAnimation 3s infinite;
//   @keyframes confettiAnimation {
//     0%,
//     100% {
//       transform: translate(0, 0);
//     }
//     50% {
//       transform: translate(100vw, 100vh) rotate(600deg);
//     }
//   }
// `

export const AchivedKeyResultModal = ({ isOpen, handleClose }: AchivedKeyResultModalProperties) => {
  const intl = useIntl()

  return (
    <Modal
      autoFocus
      id="2433243"
      returnFocusOnClose={false}
      isOpen={isOpen}
      size="100%"
      onClose={handleClose}
    >
      <ModalOverlay />
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
