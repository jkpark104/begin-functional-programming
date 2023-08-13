import * as O from "./option";

export const stockItem = () => {
  const optionDiscountPrice = O.fromUndefined(1000); // Option을 반환
  const discountPrice = O.getOrElse(optionDiscountPrice, 0);

  const optionSaleText = O.map(
    optionDiscountPrice,
    (discountPrice) => `${discountPrice}원 할인`
  ); // Option을 반환

  const saleText = O.getOrElse(optionSaleText, "");
};

export const totalDiscountPrice = () => {
  const discountPrice = O.getOrElse(O.fromUndefined(1000), 0);

  return discountPrice;
};
