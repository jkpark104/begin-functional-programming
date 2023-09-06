const f = (str: string) => {
  setTimeout(() => {
    console.log("f 호출: " + str);
  }, 500);

  return str.length * 2;
};

const g = (n: number) => {
  return n + 1;
};

const h = (x: number) => {
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

const id = <A>(a: A): A => {
  return a;
};

const cpsId = <A>(a: A, ret: (a: A) => void) => {
  ret(a);
};

export const main = () => {
  const a = id("test");
  console.log(a);

  cpsId("test", (a) => {
    console.log(a);
  });

  greeting("world");
  console.log("프로그램이 종료되었습니다");
};
