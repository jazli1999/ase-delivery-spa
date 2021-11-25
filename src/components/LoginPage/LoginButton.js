import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setUser } from './loginSlice';

export default function LoginButton(props) {
    const dispatch = useDispatch();

    return (
        <Button type="primary"
        style={{ margin: '10px'}}
        onClick={() => {dispatch(setUser({userRole: props.selectedRole, username: props.username, uid: 0}))}}>
        Log In
    </Button>
    )
}

// function submit(api, username, password) {
//     console.log(`login ${api} ${username} ${password}`);
// }