import * as types from './mutation-types'

export default {
  [types.SET_CARTLIST](state, cartList) {
    state.cartList = cartList
  }
}
