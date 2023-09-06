const f = (str: string): Promise<number> =>
  new Promise((resolve, reject) => {
    if (str === "") {
      reject("Error: str is empty");
      return;
    }

    setTimeout(() => {
      console.log("f 호출: " + str);

      resolve(str.length * 2);
    }, 500);
  });

const g = (n: number): Promise<number> =>
  new Promise((resolve, reject) => {
    if (n === 6) {
      reject("6은 입력할 수 없습니다");
      return;
    }

    setTimeout(() => {
      console.log("g 호출: " + n);
      resolve(n + 1);
    }, 500);
  });

const h = (x: number): Promise<boolean> =>
  new Promise((resolve, reject) => {
    if (x === 5) {
      reject("5는 입력할 수 없습니다.");
    }

    setTimeout(() => {
      console.log("h 호출: " + x);
      resolve(x % 3 === 0);
    }, 500);
  });

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
  f("test").then(g).then(h).then(program).catch(handleError);

  // 작업의 실행과 콜백함수의 지정이 서로 독립적으로 지정됨
  // 프로미스 객체가 생성됨과 동시에 지정된 작업이 시작됨

  greeting("world");
  console.log("프로그램이 종료되었습니다");
};
