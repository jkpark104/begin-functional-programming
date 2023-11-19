const pipeFunctions =
  <A, B, C>(f: (a: A) => B, g: (b: B) => C) =>
  (a: A): C =>
    g(f(a));

type _Observer<A> = (a: A) => void;
type _Observable<A> = (subscribe: _Observer<A>) => void;

const map =
  <A, B>(f: (a: A) => B) =>
  (source: _Observable<A>): _Observable<B> => {
    return (subscribe) => {
      source((a) => {
        const b = f(a);
        subscribe(b);
      });
    };
  };

const filter =
  <A>(pred: (a: A) => boolean) =>
  (source: _Observable<A>): _Observable<A> => {
    return (subscribe) => {
      source((a) => {
        if (pred(a)) {
          subscribe(a);
        }
      });
    };
  };

const filterObserver =
  <A>(pred: (a: A) => boolean) =>
  (subscribe: _Observer<A>): _Observer<A> => {
    return (a) => {
      if (pred(a)) {
        subscribe(a);
      }
    };
  };

// map :: (A => B) => Array<A> => Array<B>
// mapObserver :: (A => B) => Observer<B> => Observer<A>
const mapObserver =
  <A, B>(f: (a: A) => B) =>
  (subscribe: _Observer<B>): _Observer<A> => {
    return (a) => {
      subscribe(f(a));
    };
  };

// map :: (A => B) => Observable<A> => Observable<B>
// lift :: (Observer<B> => Observer<A>) => Observable<A> => Observable<B>
const lift =
  <A, B>(f: (b: _Observer<B>) => _Observer<A>) =>
  (source: _Observable<A>): _Observable<B> => {
    return (subscribe) => {
      source(f(subscribe));
    };
  };

// const _liftedMap = <A, B>(f: (a: A) => B) => lift(mapObserver(f));
const liftedMap = pipeFunctions(mapObserver, lift);
const liftedFilter = pipeFunctions(filterObserver, lift);

export const main = () => {};
