import { Button } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserRole, setUserIdAndUsername, setLoginStatus } from './loginSlice';
import { api_url, getXSRFToken } from '../Common/utils';

export default function LoginButton(props) {
    const dispatch = useDispatch();

    // let user;
    let submit = function () {
        let base = Buffer.from(`${props.username}:${props.password}`).toString('base64');
        axios.get(`${api_url}:9091/api/auth/csrf`, {withCredentials: true})
            .then(response => {
                if (response.status === 200) {
                    return axios({
                        method: 'POST',
                        url: `${api_url}:9091/api/auth`,
                        withCredentials: true,
                        headers: {
                            'Authorization': `Basic ${base}`,
                            'X-XSRF-TOKEN': getXSRFToken()
                        }
                    });
                }
        }).then(response => {
            if (response.status === 200) {
                return axios({
                    method: 'GET',
                    withCredentials: true,
                    url: `${api_url}:9091/api/auth/current-session`,
                    headers: {
                        'Authorization': `Basic ${base}`,
                    }
                });
            }
        }).then(response => {
            dispatch(setUserRole({userRole: response.data['role'].toLowerCase()}));
            return axios({
                method: 'GET',
                withCredentials: true,
                url: `${api_url}:8080/api/delivery/users/${props.username}`
                });
        }).then(response => {
            if (response.status === 200) {
                dispatch(setUserIdAndUsername({uid: response.data['id'], uname: response.data['username']}));
                dispatch(setLoginStatus({loginStatus: true}));
            }
        })
    };

    return (
        <div>
            <Button type="primary"
                style={{ margin: '10px' }}
                onClick={submit}>
                Log In
            </Button>
        </div>
    )
}

