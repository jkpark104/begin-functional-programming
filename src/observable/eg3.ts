import { Observable, pipe } from "rxjs";
import { filter, take } from "rxjs/operators";

const isEven = (num: number) => num % 2 === 0;

const integerObservable: Observable<number> = new Observable((subscribe) => {
  let i = 0;

  setInterval(() => {
    i = i + 1;
    subscribe.next(i);
  }, 1000);
});

const ns: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const main = () => {
  const xs = ns
    // Array<A> ~> (A => boolean) => Array<A>
    .filter(isEven)
    .slice(0, 3); // 배열을 조작하는 함수

  // rxjs Observable을 조작하는 코드

  // filter :: (A => boolean) => Observable<A> => Observable<A>
  // Operator : Observable을 입력받아서 Observable을 리턴하는 함수
  const evenFilter = filter(isEven);
  const take3 = take(3);

  // Pipe : Operator를 합성하는 함수
  const take3EvenNumbers = pipe(evenFilter, take3);

  take3EvenNumbers(integerObservable).subscribe({
    next: console.log,
  }); // [2, 4, 6]
};
