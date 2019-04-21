import * as types from './mutation-types'

export default {
  [types.SET_CARTLIST](state, cartList) {
    state.cartList = cartList
  },
  [types.SET_ADDRESS_LIST](state, addressList) {
    state.addressList = addressList
  },
  [types.SET_CHECKED_LIST](state, checkedList) {
    state.checkedList = checkedList
  },
  [types.SET_CHECKED_ADDRESS](state, address) {
    state.checkedAddress = address
  }
}
