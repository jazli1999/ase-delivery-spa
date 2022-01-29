import axios, { AxiosRequestConfig } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { nanoid } from '@reduxjs/toolkit';

const mockAPIInstance = axios.create();
const mock = new AxiosMockAdapter(mockAPIInstance, {
  delayResponse: 500,
});

// Mock API endpoints
mock.onGet('/api/delivery/users').reply(200, [
  {
    key: '1',
    username: 'Customer1',
    email: 'cus1@gmail.com',
    RFID: 'HTRC11001T',
    password: 'safds',
    role: 'customer',
  },
  {
    key: '2',
    username: 'Customer2',
    email: 'cus2@gmail.com',
    RFID: 'HTRC11002T',
    password: 'sdfqwef',
    role: 'customer',
  },
  {
    key: '3',
    username: 'Customer3',
    email: 'cus3@gmail.com',
    RFID: 'HTRC11003T',
    password: 'asdfsadf',
    role: 'customer',
  },
  {
    key: '1',
    username: 'Deliverer1',
    email: 'del11@gmail.com',
    RFID: 'CRTH11001T',
    role: 'deliverer',
  },
  {
    key: '2',
    username: 'Deliverer2',
    email: 'del2@gmail.com',
    RFID: 'CRTH11002T',
    role: 'deliverer',
  },
  {
    key: '3',
    username: 'Deliverer3',
    email: 'del3@gmail.com',
    RFID: 'CRTH11003T',
    role: 'deliverer',
  },
]);

mock.onPut('/api/delivery/user').reply(({ data }) => [ 200, data ]);

mock.onPost('/api/delivery/user').reply(({ data }) => {
  console.log(data);
  const dataWithKey = JSON.parse(data);
  dataWithKey.key = nanoid();
  return [ 200, JSON.stringify(dataWithKey) ];
});

export default mockAPIInstance;
