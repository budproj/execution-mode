import ora from "ora";

export const spinningRun = async <T extends Array<any>, U>(message: string, promise: Promise<U>) => {
  const spinner = ora(message).start();

  try {
    const result = await promise;
    spinner.succeed();
    return result;
  } finally {
    spinner.stop();
  }
};
