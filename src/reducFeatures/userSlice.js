import {createSlice} from "@reduxjs/toolkit";
export const userSlice = createSlice ({
    name: "user",
    initialState: {  // itialement quand l'utilisateur n'a pas encore fais de login
        user:null
    },
    reducers: {  // pour les update de states
        dadosSede: (state, action) => {  // state= on prend le state et on fait Update
                                     // action = les données qui seront passées quand on fait le login
        state.user = action.payload;
                     
        },

        logout: (state) => {
            state.user = null
        }

    }
})

export const {dadosSede, logout} = userSlice.actions;
export const selectUser = (state) => state.user.user;  // On va le mettre dans le fichier App.js pour passer les informations
export default userSlice.reducer; 