import { Button } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './loginSlice';

export default function LoginButton(props) {
    const dispatch = useDispatch();

    let submit = function (userRole) {
    
        axios.get('http://localhost:8080/auth', { headers: { 'Authorization': 'Basic' } }).then(res => {
            dispatch(setUser({ userRole: userRole, uname: res.data, uid: 0 }));
        });
    };

    return (
        <Button type="primary"
            style={{ margin: '10px' }}
            onClick={() => {submit(props.selectedRole)}}>
            Log In
        </Button>
    )
}

