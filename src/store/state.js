import { loadCartList, getAddress } from 'common/js/cache.js'

export default {
  cartList: loadCartList(),
  addressList: getAddress(),
  checkedList: [],
  checkedAddress: {}
}
