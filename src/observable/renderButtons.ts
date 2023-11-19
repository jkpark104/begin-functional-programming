import { fromEvent, map, mergeMap, scan, zip } from "rxjs";
import { Item } from "../common/types";

const observableFromItem = (item: Item) => {
  const code = item.code;

  const element = document.getElementById(`add-${code}-button`)!;
  const observable = fromEvent(element, "click");

  return observable;
};

const updateItem = (item: Item) => {
  return { ...item, quantity: item.quantity + 1 };
};

const updateItemByCode =
  (code: string) =>
  (item: Item): Item => {
    return item.code === code ? updateItem(item) : item;
  };

const addFruit = (state: Array<Item>, code: string) => {
  return state.map(updateItemByCode(code));
};

export const createObservables = (cart: Array<Item>) => {
  const observables = cart.map(observableFromItem);

  const codes = cart.map((item) => item.code);

  zip(observables, codes)
    .pipe(
      mergeMap(([observable, code]) => {
        return observable.pipe(map(() => code));
      }),
      scan(addFruit, cart)
    )
    .subscribe(console.log);

  const x = ["tomato", "apple", "banana"].reduce(addFruit, cart);
};

const renderButton = (item: Item) => {
  return `
  <div>
    <button id="add-${item.code}-button">
      Add ${item.name}
    </button>
  </div>
  `;
};
