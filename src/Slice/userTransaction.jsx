import { createSlice } from "@reduxjs/toolkit";
// firebase library
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const initialState = {
  transactions: [],
  loading: false,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.transactions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setTransaction, setLoading } = transactionSlice.actions;

// function to fetch transactions data
export function fetchData() {
  return function (dispatch) {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          dispatch(setLoading(true));
          const querySnapshot = await getDocs(
            collection(db, `user/${user.uid}/transactions`)
          );
          const transactions = [];
          querySnapshot.forEach((doc) => {
            transactions.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          // storing transactions into redux
          dispatch(setTransaction(transactions));
          // removeing loading
          dispatch(setLoading(false));
        }
      });
    } catch (error) {
      // removeing loading
      dispatch(setLoading(false));
      toast.error(error.message);
    }
  };
}

export default transactionSlice.reducer;
