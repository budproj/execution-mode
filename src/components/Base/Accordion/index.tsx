import {
  Text,
  Accordion as ChakraAccordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface AccordionProperties {
  title: string | ReactNode
  children: ReactNode
}

export const Accordion = ({ title, children, ...rest }: AccordionProperties) => {
  return (
    <ChakraAccordion {...rest} allowToggle defaultIndex={0}>
      <AccordionItem border={0}>
        <AccordionButton
          p={0}
          mb={3}
          _hover={{}}
          _focus={{ boxShadow: 'none' }}
          justifyContent="space-between"
        >
          <Text fontWeight={600} pl="0.5rem" flex={1} textAlign="left">
            {title}
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={0}>{children}</AccordionPanel>
      </AccordionItem>
    </ChakraAccordion>
  )
}
