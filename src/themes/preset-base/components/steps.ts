import { StepsTheme } from 'chakra-ui-steps'

const Steps = {
  ...StepsTheme,
  baseStyle: (properties: any) => {
    return {
      ...StepsTheme.baseStyle(properties),
      label: {
        ...StepsTheme.baseStyle(properties).label,
        color: 'gray.600',
      },
      stepIconContainer: {
        ...StepsTheme.baseStyle(properties).stepIconContainer,
        background: 'gray.100',
        borderColor: 'gray.100',
        _activeStep: {
          background: 'brand.500',
          borderColor: 'brand.500',
          '& span': {
            color: 'white',
          },
        },
      },
    }
  },
}

export default Steps
