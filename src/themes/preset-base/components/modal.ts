import tokens from '../../tokens'

const Modal = {
  baseStyle: () => ({
    body: {
      py: 8,
      px: 16,
    },
    overlay: {
      bg: `${tokens.colors['new-gray800']}80`,
    },
  }),

  defaultProps: {
    isCentered: true,
  },
}

export default Modal
