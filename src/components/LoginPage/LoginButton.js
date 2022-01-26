import { Button } from 'antd';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setUser } from './loginSlice';
import { api_url } from '../Common/url';

export default function LoginButton(props) {
    // const dispatch = useDispatch();
    // let user;

    let submit = function () {
        let base = Buffer.from(`${props.username}:${props.password}`).toString('base64');
        console.log(base);
        let csrfToken;
        axios.get(`${api_url}:9091/api/auth/csrf`, {withCredentials: true})
            .then(response => {
                if (response.status === 200) {
                    csrfToken = document.cookie.split('; ')
                        .find(row => row.startsWith('XSRF-TOKEN='))
                        .split('=')[1];
                    console.log(csrfToken);
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
        }).then(response => {console.log(response.status)});
    };

    return (
        <Button type="primary"
            style={{ margin: '10px' }}
            onClick={submit}>
            Log In
        </Button>
    )
}

