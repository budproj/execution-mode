import { Box, Button, Slide } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

const headerHeight = '78px'
const routineDrawerHeight = `calc(100% - ${headerHeight})`
const preventScroll = (event: Event) => {
  event.preventDefault()
  event.stopPropagation()
  return false
}

const RoutineDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const reference = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'
    if (isOpen) {
      window.addEventListener(wheelEvent, preventScroll, { passive: false })
    }

    return () => window.removeEventListener(wheelEvent, preventScroll)
  }, [isOpen])

  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>ABRE ESSA BAGACA</Button>}
      <Slide in={isOpen} direction="bottom" style={{ zIndex: 3, top: headerHeight }}>
        <Box width="100%" height="100%" bg="new-gray.300">
          <header>
            <Button onClick={handleClose}>X</Button>
          </header>
          COISAS DO FORMULARIO
        </Box>
      </Slide>
    </>
  )
}

export default RoutineDrawer

// {
//   /* <Modal isOpen={isOpen} motionPreset="slideInBottom" onClose={handleClose}>
//         <ModalBody width="100vw">
//           <ModalContent height={routineDrawerHeight} bg="new-gray.300">
//             <header>
//               <Button onClick={handleClose}>X</Button>
//             </header>
//             COISAS DO FORMULARIO
//           </ModalContent>
//           <ModalCloseButton />
//         </ModalBody>
//       </Modal> */
// }
