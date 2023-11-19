import { Async } from "../promise/example3";

const promiseF = (str: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`promiseF 1: ${str}`);
    }, 500);

    setTimeout(() => {
      resolve(`promiseF 2: ${str}`);
    }, 1000);
  });
};

// setTimeout 1개만 실행

const asyncF = (str: string): Async<string> => {
  return (ret) => {
    setTimeout(() => {
      ret(`asyncF 1: ${str}`);
    }, 500);

    setTimeout(() => {
      ret(`asyncF 2: ${str}`);
    }, 1000);
  };
};

// setTimeout 2개 모두 실행
