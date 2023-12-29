import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(state, action) {
      // console.log(state)
      // human-readable format
      // console.log(JSON.parse(JSON.stringify(state)))

      const filter = action.payload
      return filter
    },
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer