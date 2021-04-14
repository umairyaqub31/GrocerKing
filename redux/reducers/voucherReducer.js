import produce from 'immer';
const initState = {
  vouchers: [],
  voucherLoading: false,
};

const VoucherReducer = (state = initState, action) => {
  switch (action.type) {
    case 'START_VOUCHER_LOADING':
      return produce(state, draft => {
        draft.voucherLoading = true;
      });
    case 'ADD_VOUCHER':
      return produce(state, draft => {
        draft.vouchers.push(action.payload);
      });
    case 'STOP_VOUCHER_LOADING':
      return produce(state, draft => {
        draft.voucherLoading = false;
      });
    case 'CLEAR_VOUCHER':
      return produce(state, draft => {
        draft.vouchers = [];
      });
    default:
      return state;
  }
};

export default VoucherReducer;
