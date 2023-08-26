const tenDivideBy = (n: number): number => {
  if (n === 0) {
    throw new Error("0으로 나눌 수 없습니다.");
  }

  return 10 / n;
};

// 타입만으로는 이 함수가 에러를 던진다는 것을 알 수 없다.

const test = () => {
  try {
    const y = tenDivideBy(0); // 코드의 위치에 따라 에러가 발생할 수도 있고 발생하지 않을 수도 있다. -> 순수하지 않다.
    return y;
  } catch {
    return 1;
  }
};
