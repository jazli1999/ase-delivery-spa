import { Button } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './loginSlice';

export default function LoginButton(props) {
    const dispatch = useDispatch();
    let user;

    let submit = function () {
        let base = Buffer.from(`${props.username}:${props.password}`).toString('base64');
        console.log(base);
        axios.get(`${props.api}${props.username}`, { headers: { 'Authorization': `Basic ${base}`} }).then(res => {
            console.log(res.data);
            dispatch(setUser({ userRole: res.data['role'].toLowerCase(), uname: res.data['username'], uid: res.data['id'] }));
         });
        // axios.get(`${props.api}${props.username}`, { headers: { 'Authorization': `Basic ${base}`} }).then(res => {
        //    user = res.data;
        //    console.log(user);
        // });
    };

    return (
        <Button type="primary"
            style={{ margin: '10px' }}
            onClick={submit}>
            Log In
        </Button>
    )
}

