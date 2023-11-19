type Async<A> = (cb: (a: A) => void) => void;

const ns: Array<number> = [1, 2, 3, 4, 5];

// Iterable 내의 상태 갱신과 상태를 기반으로 값을 생성하는 함수
type _Iterator<A> = () => A;
// 상태를 초기화하고 Iterator를 생성하는 함수
type _Iterable<A> = () => _Iterator<A>;

type Observer<A> = (a: A) => void;

const integers = (n: number) => {
  const ret: Array<number> = [];
  let i = 0;
  while (i < n) {
    i = i + 1;
    ret.push(i);
  }

  return ret;
};

const integerGenerator = () => {
  let i = 0;

  return () => {
    i = i + 1;
    return i;
  };
};

const promiseIntegers = (n: number): Promise<Array<number>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(integers(n));
    }, 1000);
  });
};

const integerObservable: Async<number> = (ret) => {
  const iter = integerGenerator();
  setInterval(() => {
    ret(iter());
  }, 1000);
};

// integerObservable(console.log);

const iter = integerGenerator();
const onStep = () => {
  const n = iter();
  console.log(n);
};
