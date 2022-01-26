import { Button } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './loginSlice';
import { api_url } from '../Common/url';

export default function LoginButton(props) {
    const dispatch = useDispatch();
    // let user;

    let submit = function () {
        let base = Buffer.from(`${props.username}:${props.password}`).toString('base64');
        let csrfToken;
        axios.get(`${api_url}:9091/api/auth/csrf`, {withCredentials: true})
            .then(response => {
                if (response.status === 200) {
                    csrfToken = document.cookie.split('; ')
                        .find(row => row.startsWith('XSRF-TOKEN='))
                        .split('=')[1];
                    return axios({
                        method: 'POST',
                        url: `${api_url}:9091/api/auth`,
                        withCredentials: true,
                        headers: {
                            'Authorization': `Basic ${base}`,
                            'X-XSRF-TOKEN': csrfToken
                        }
                    });
                }
        }).then(response => {
            if (response.status === 200) {
                csrfToken = document.cookie.split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                .split('=')[1];
                return axios({
                    method: 'GET',
                    url: `${api_url}:9091/api/auth/credentials/${props.username}`,
                    headers: {
                        'Authorization': `Basic ${base}`,
                        'X-XSRF-TOKEN': csrfToken
                    }
                });
            }
        }).then(response => {
            dispatch(setUser({userRole: response.data.toLowerCase(), uname: props.username, uid: 0}))
        });
    };

    return (
        <Button type="primary"
            style={{ margin: '10px' }}
            onClick={submit}>
            Log In
        </Button>
    )
}

