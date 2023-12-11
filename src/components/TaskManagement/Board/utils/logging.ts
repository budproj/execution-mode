export const debug = (message: string) => {
  // If (process.env.NODE_ENV !== 'development') {
  //   return;
  // }

  console.log({ message })
}
