import { StepsStyleConfig } from 'chakra-ui-steps'

const Steps = {
  ...StepsStyleConfig,
  baseStyle: (properties: any) => {
    return {
      ...StepsStyleConfig.baseStyle(properties),
      label: {
        ...StepsStyleConfig.baseStyle(properties).label,
        color: 'gray.600',
      },
      stepIconContainer: {
        ...StepsStyleConfig.baseStyle(properties).stepIconContainer,
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
