import {createSlice} from '@reduxjs/toolkit';

// const initialState = {totalExpense : 0};
const initialState = {
    expenses: [],
    isPremium: false,
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
        activatePremium (state) {
            state.isPremium = true;
        },
    }
});

export const {addExpense, deleteExpense, setExpenses, activatePremium} = expenseSlice.actions;

export default expenseSlice.reducer;