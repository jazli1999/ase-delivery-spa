import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        key: '1',
        name: 'Customer1',
        email: 'cus1@gmail.com',
        RFID: 'HTRC11001T',
        password: 'safds',
    },
    {
        key: '2',
        name: 'Customer2',
        email: 'cus2@gmail.com',
        RFID: 'HTRC11002T',
        password: 'sdfqwef',
    },
    {
        key: '3',
        name: 'Customer3',
        email: 'cus3@gmail.com',
        RFID: 'HTRC11003T',
        password: 'asdfsadf',
    },
];

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        addUser(state, action) {
            state.push(action.payload)
        },
        updateUser(state, action) {
            const { key, username, email, RFID, password } = action.payload
            const existingUser = state.find(user => user.key === key)
            if (existingUser) {
                existingUser.username = username
                existingUser.email = email
                existingUser.RFID = RFID
                existingUser.password = password
            }
        }
    }
})

export const { addUser, updateUser } = usersSlice.actions

export default usersSlice.reducer