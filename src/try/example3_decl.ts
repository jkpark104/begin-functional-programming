import * as T from "./try";

const f = (str: string): T.Try<string, number> => {
  if (str === "") {
    return T.failed("Empty string");
  }
  return T.success(str.length * 2);
};

const g = (n: number): T.Try<string, number> => {
  if (n === 6) {
    return T.failed("n is 6");
  }
  return T.success(n + 1);
};

const h = (x: number): T.Try<string, boolean> => {
  if (x === 5) {
    return T.failed("x is 5");
  }
  return T.success(x % 3 === 0);
};

const handleError = (e: unknown) => {
  console.log("Error:", e);
};

const program = (s: boolean) => {
  console.log(s);
};

const greeting = (name: string) => {
  console.log(`Hello, ${name}!`);
};

export const main = () => {
  const a = "test";
  const b = f(a);
  const c = T.flatMap(b, (b_) => {
    return T.success(T.getOrElse(g(b_), () => 3));
  });
  const d = T.flatMap(c, h);

  const result = T.map(d, program);

  T.getOrElse(result, handleError);

  greeting("world");
  console.log("프로그램이 종료되었습니다");
};
