export type Some<A> = {
  readonly _tag: "Some";
  readonly value: A;
};

export type None = {
  readonly _tag: "None";
};

export type Option<A> = Some<A> | None;

export const some = <A>(value: A): Option<A> => ({ _tag: "Some", value });

export const none = (): Option<never> => ({ _tag: "None" });

export const isSome = <A>(option: Option<A>): option is Some<A> =>
  option._tag === "Some";

export const isNone = <A>(option: Option<A>): option is None =>
  option._tag === "None";

export const fromUndefined = <A>(value: A | undefined): Option<A> => {
  if (value === undefined) {
    return none();
  }

  return some(value);
};

export const getOrElse = <A>(oa: Option<A>, defaultValue: A): A => {
  // 값이 없으면 지정된 기본값을 반환합니다.
  // 값이 있으면 지정된 함수를 실행한 결과를 반환합니다.
  if (isNone(oa)) {
    return defaultValue;
  }

  return oa.value;
};

export const map = <A, B>(oa: Option<A>, f: (a: A) => B): Option<B> => {
  // 값이 없으면 아무것도 하지 않고 그대로 반환합니다.
  if (isNone(oa)) {
    return oa;
  }
  // 값이 있으면 지정된 함수를 실행한 결과를 반환합니다.
  return some(f(oa.value));
};

export const mapOrElse = <A, B>(
  oa: Option<A>,
  f: (a: A) => B,
  defaultValue: B
): B => {
  return getOrElse(map(oa, f), defaultValue);
};
