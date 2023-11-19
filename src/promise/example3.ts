export type Async<A> = (ret: (x: A) => void) => void;

const resolve = <A>(a: A): Async<A> => {
  return (ret) => {
    ret(a);
  };
};

const flatMap = <A, B>(a: Async<A>, f: (a: A) => Async<B>): Async<B> => {
  return (ret) => {
    a((a_) => {
      const b = f(a_);
      b((b_) => ret(b_));
    });
  };
};

// Async<B>를 리턴 하는 f 함수를 실행해 리턴값을 Async<B>로 만들어 리턴한다. -> flatMap

const map = <A, B>(a: Async<A>, f: (a: A) => B): Async<B> => {
  return flatMap(a, (a_) => resolve(f(a_)));
};

// B를 리턴하는 f 함수를 실행해 리턴값을 Async<B>로 만들어 리턴한다. -> map

const run = <A>(a: Async<A>) => {
  a(() => {
    return;
  });
};

const f =
  (str: string): Async<number> =>
  (ret) => {
    setTimeout(() => {
      console.log("f 호출: " + str);

      ret(str.length * 2);
    }, 500);
  };

const g =
  (n: number): Async<number> =>
  (ret) => {
    setTimeout(() => {
      console.log("g 호출: " + n);
      ret(n + 1);
    }, 500);
  };

const h =
  (x: number): Async<boolean> =>
  (ret) => {
    setTimeout(() => {
      console.log("h 호출: " + x);
      ret(x % 3 === 0);
    }, 500);
  };

// const handleError = (e: unknown) => {
//   console.log("Error:", e);
// };

const program = (s: boolean) => {
  console.log(s);
};

const greeting = (name: string) => {
  console.log(`Hello, ${name}!`);
};

export const main = () => {
  const a = f("test");
  const b = flatMap(a, (a_) => g(a_));
  const c = flatMap(b, (b_) => h(b_));
  const result = map(c, (c_) => program(c_));

  run(result);

  greeting("world");
  console.log("프로그램이 종료되었습니다");
};
