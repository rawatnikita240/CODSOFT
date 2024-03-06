import {configureStore} from '@reduxjs/toolkit';
import { alertSlice } from './features/alertSlice';
import { authSlice } from './features/authslice';



export default configureStore({
    reducer:{
        alerts: alertSlice.reducer,
        auth: authSlice.reducer,
    },
})