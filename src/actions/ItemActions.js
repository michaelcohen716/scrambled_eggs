import {
  MAKE_PURCHASE
} from './types';

export const makePurchase = ({ item, cost }) => {
  return {
    type: MAKE_PURCHASE,
    item,
    cost
  }
}
