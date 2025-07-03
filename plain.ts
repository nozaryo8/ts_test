// 日本の通貨単位（大きい順）
const DENOMINATIONS = [10000, 5000, 1000, 500, 100, 50, 10, 5, 1] as const;

// お釣りの内訳を表す型
type Change = {
  [key: number]: number; // 通貨単位: 枚数
}

/**
 * お釣りを計算する関数
 * @param price 商品価格
 * @param paid 支払い金額
 * @returns お釣りの内訳
 */
function calculateChange(price: number, paid: number): Change {
  if (paid < price) {
    throw new Error('支払い金額が不足しています');
  }
  
  const changeAmount = paid - price;
  
  // お釣りが0円の場合は空のオブジェクトを返す
  if (changeAmount === 0) {
    return {};
  }
  
  const result: Change = {};
  let remaining = changeAmount;
  
  // 大きい通貨単位から順番に処理（貪欲法）
  for (const denomination of DENOMINATIONS) {
    if (remaining >= denomination) {
      const count = Math.floor(remaining / denomination);
      result[denomination] = count;
      remaining -= denomination * count;
    }
  }
  
  return result;
}