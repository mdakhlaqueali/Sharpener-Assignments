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
        addExpense(state, action){
            const {id, newExpense} = action.payload;
            newExpense.id = id;
            state.expenses.push(newExpense);
            // console.log(state.expenses);
            // return {
            //     ...state,
            //     expenses: [...state.expenses, action.payload],
            // };
        },
        deleteExpense(state, action) {
            const expenseId = action.payload;
            state.expenses = state.expenses.filter(expense => expense.id !== expenseId);
        },
        editExpense(state, action) {
            const { id, editedExpense } = action.payload;
            state.expenses = state.expenses.map((expense) =>
              expense.id === id ? { ...expense, ...editedExpense } : expense
            );
        },
        setExpenses(state, action) {
            state.expenses = action.payload;
        },
        activatePremium (state) {
            state.isPremium = true;
        },
    }
});

export const {addExpense, deleteExpense, editExpense, setExpenses, activatePremium} = expenseSlice.actions;

export default expenseSlice.reducer;