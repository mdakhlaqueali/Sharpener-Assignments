import {createSlice} from '@reduxjs/toolkit';

// const initialState = {totalExpense : 0};
const initialState = {
    expenses: [],
  };

const expenseSlice = createSlice({
    name: 'expenses',
    initialState:initialState,
    reducers: {
        addExpense (state, action) {
            state.expenses.push(action.payload);
        },
        deleteExpense(state, action) {
            const expenseId = action.payload;
            state.expenses = state.expenses.filter(expense => expense.id !== expenseId);
        },
        setExpenses(state, action) {
            state.expenses = action.payload;
        },
    }
});

export const {addExpense, deleteExpense, setExpenses} = expenseSlice.actions;

export default expenseSlice.reducer;