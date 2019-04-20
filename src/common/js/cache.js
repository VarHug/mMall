import storage from 'good-storage'

const CART_LIST_KEY = '__cartList__'

// 将商品存入cartList
export function saveGood(goodInfo) {
  let cartList = []
  cartList = storage.get(CART_LIST_KEY, [])
  let isNewGood = true
  cartList.forEach(good => {
    if (good.gid === goodInfo.gid) {
      good.num += goodInfo.num
      isNewGood = false
    }
  })
  if (isNewGood) {
    cartList.push(goodInfo)
  }
  storage.set(CART_LIST_KEY, cartList)
  return cartList
}

// 将商品移出cartList
export function removeGood(productId) {
  let cartList = storage.get(CART_LIST_KEY, [])
  let index = cartList.findIndex((good) => {
    return good.gid === productId
  })
  if (index > -1) {
    cartList.splice(index, 1)
  }
  storage.set(CART_LIST_KEY, cartList)
  return cartList
}

// 获取购物车列表
export function loadCartList() {
  return storage.get(CART_LIST_KEY, [])
}

/**
 *
 * @export
 * @param {Array} states {gid: '', isChecked: boolean}
 */
export function setCheckedState(states) {
  let cartList = storage.get(CART_LIST_KEY, [])
  states.forEach(good => {
    for (let i = 0; i < cartList.length; i++) {
      if (good.gid === cartList[i].gid) {
        cartList[i].isChecked = good.isChecked
        break
      }
    }
  })
  storage.set(CART_LIST_KEY, cartList)
  return cartList
}
