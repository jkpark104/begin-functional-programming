type Success<R> = {
  readonly _tag: "success";
  readonly result: R;
};

type Failed<E> = {
  readonly _tag: "failed";
  readonly error: E;
};

export type Try<E, R> = Failed<E> | Success<R>;

export const success = <R>(result: R): Try<never, R> => ({
  _tag: "success",
  result,
});

export const failed = <E>(error: E): Try<E, never> => ({
  _tag: "failed",
  error,
});

export const isSuccess = <R>(ta: Try<unknown, R>): ta is Success<R> => {
  return ta._tag === "success";
};

export const isFailed = <E>(ta: Try<E, unknown>): ta is Failed<E> => {
  return ta._tag === "failed";
};

export const getOrElse = <E, R>(
  ta: Try<E, R>,
  defaultValue: (e: E) => R
): R => {
  // 에러가 있을 경우 에러에 기반해 기본값을 결정
  if (isFailed(ta)) {
    return defaultValue(ta.error);
  }
  // 결과가 성공이면 result를 반환
  return ta.result;
};

export const map = <E, A, B>(ta: Try<E, A>, f: (a: A) => B): Try<E, B> => {
  if (isFailed(ta)) {
    return ta;
  }

  return success(f(ta.result));
};

// Array<T.Try<ParseError, ParsedItem>> => Array<ParsedItem>
export const keepSuccess = <E, R>(tas: Array<Try<E, R>>): Array<R> => {
  const ret = tas.flatMap((ta) => {
    if (isSuccess(ta)) {
      return [ta.result];
    } else {
      return [];
    }
  });

  return ret;
};

export const flat = <E, A>(tta: Try<E, Try<E, A>>): Try<E, A> => {
  if (isSuccess(tta)) {
    return tta.result;
  }

  return tta;
};

export const flatMap = <E, A, B>(
  ta: Try<E, A>,
  f: (a: A) => Try<E, B>
): Try<E, B> => {
  return flat(map(ta, f));
};
