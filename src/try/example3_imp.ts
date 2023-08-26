const f = (str: string) => {
  if (str === "") {
    throw new Error("Empty string");
  }
  return str.length * 2;
};

const g = (n: number) => {
  if (n === 6) {
    throw new Error("n is 6");
  }
  return n + 1;
};

const h = (x: number) => {
  if (x === 5) {
    throw new Error("x is 5");
  }
  return x % 3 === 0;
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
  try {
    const a = "test";
    const b = f(a);
    let c;
    try {
      c = g(b);
    } catch {
      c = 3;
    }
    const d = h(c);

    program(d);
    // 프로그램의 실행이 이전 결과에 의존
    // 예외라는 부수효과가 묵시적으로 포함
  } catch (e) {
    handleError(e);
  }

  greeting("world");
  console.log("프로그램이 종료되었습니다");
};
