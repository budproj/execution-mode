import ora from "ora";
import read from "read";
import chalk from "chalk";

export const spinningRun = async <T extends Array<any>, U>(message: string, promise: Promise<U>, success?: string) => {
  const now = Date.now();
  const spinner = ora(message).start();

  try {
    const result = await promise;
    spinner.succeed(`${success || message} (${Date.now() - now}ms)`);
    return result;
  } finally {
    spinner.stop();
  }
};

export const areYouSure = async (message: string) => {

  console.log(chalk.yellowBright(message));

  const areYouSure = await read({
    prompt: 'Are you sure? (y/N)',
  });

  return areYouSure.toLowerCase() === 'y';
};

export const notSure = async (message: string) => {
  return !(await areYouSure(message));
};
