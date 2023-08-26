import { Item } from "../common/types";
import * as T from "./try";

type ParsedItem = { _tag: "parsedItem" } & Item;

type ParseError = {
  name: string;
  message: string;
};

type ArrayItem = Array<T.Try<ParseError, ParsedItem>>;

export const parseItem = (item: Item): T.Try<ParseError, ParsedItem> => {
  if (item.quantity < 1) {
    return T.failed({
      name: item.name,
      message: "상품은 반드시 한 개 이상 담아야 합니다.",
    });
  } else if (item.quantity > 10) {
    return T.failed({
      name: item.name,
      message: "한 번에 10개를 초과해 담을 수 없습니다.",
    });
  }

  return T.success({
    _tag: "parsedItem",
    ...item,
  });
};

const stockItem = (item: ParsedItem): string => {
  return `${item.name} (${item.quantity}개) - ${item.price * item.quantity}원`;
};

const errorItem = (e: ParseError): string => {
  return `${e.name}: ${e.message}`;
};

const outOfStockItem = (Item: ParsedItem): string => {
  return `${Item.name} 품절`;
};

const renderItem = (item: ParsedItem): string => {
  if (item.outOfStock) {
    return outOfStockItem(item);
  } else {
    return stockItem(item);
  }
};

export const totalCalculator = (
  list: ArrayItem,
  getValue: (item: ParsedItem) => number
) => {
  return T.keepSuccess(list)
    .filter((item) => {
      try {
        return item.outOfStock === false;
      } catch {
        return false;
      }
    })
    .map(getValue)
    .reduce((total, value) => total + value, 0);
};

export const list = (list: ArrayItem) => {
  return `
    <ul>
      ${list
        .map((item) =>
          T.getOrElse(
            T.map(item, (parseItem) => renderItem(parseItem)),
            errorItem
          )
        )
        .join("")}
    </ul>
  `;
};
