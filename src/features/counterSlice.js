import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

export const getCocktails = createAsyncThunk("cocktails/getCocktails", async () => {
  const {
    data: { drinks },
  } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const { strDrinkThumb, strDrink, idDrink } =
    drinks[0];
  return { strDrinkThumb, strDrink, idDrink };
});


 export const cocktailsSlice = createSlice ({
  name: "cocktail",
  initialState: {
    cocktails: {},
    isSuccess: false,
    status :  null,
    loading: false,
    allCoctails : []
  },
  reducers: {
    addCocktails : (state) => {
     state.allCoctails.push(state.cocktails)
    },
     deleteCocktail: (state, action) => {
        const temp = [...state.allCoctails];
        state.allCoctails = temp.filter((item)=> {
           return item.idDrink !== action.payload
        })
    }
  },
  extraReducers: {
    [getCocktails.pending]: (state,action) => {
      state.status = "loading"
      state.loading = true
    },
    [getCocktails.fulfilled]: (state,action) => {
      state.status = "success";
      state.cocktails = action.payload
      state.loading = false
    },
    [getCocktails.rejected]: (state,action) => {
      state.status = "failed";
      state.loading = false
    }
  }
})

export const  { addCocktails, deleteCocktail} = cocktailsSlice.actions;
export const selectAllCoctails = (state) => state.cocktails.allCoctails;
export default cocktailsSlice.reducer

