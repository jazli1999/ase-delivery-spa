import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const mockAPIInstance = axios.create();
const mock = new AxiosMockAdapter(mockAPIInstance, {
  delayResponse: 500,
});

// Mock API endpoints
mock.onGet('/api/delivery/users').reply(200, [
  {
    username: 'Customer1',
    email: 'cus1@gmail.com',
    RFID: 'HTRC11001T',
    password: 'safds',
    role: 'customer',
  },
  {
    username: 'Customer2',
    email: 'cus2@gmail.com',
    RFID: 'HTRC11002T',
    password: 'sdfqwef',
    role: 'customer',
  },
  {
    username: 'Customer3',
    email: 'cus3@gmail.com',
    RFID: 'HTRC11003T',
    password: 'asdfsadf',
    role: 'customer',
  },
  {
    username: 'Deliverer1',
    email: 'del11@gmail.com',
    RFID: 'CRTH11001T',
    role: 'deliverer',
  },
  {
    username: 'Deliverer2',
    email: 'del2@gmail.com',
    RFID: 'CRTH11002T',
    role: 'deliverer',
  },
  {
    username: 'Deliverer3',
    email: 'del3@gmail.com',
    RFID: 'CRTH11003T',
    role: 'deliverer',
  },
  {
    username: 'Dispatcher1',
    email: 'dispatcher1@gmail.com',
    RFID: 'CRTH11003Td',
    role: 'dispatcher',
  },
]);

mock.onGet('/api/delivery/boxes').reply(200, [
  {
    id: 1,
    name: 'box 1',
    address: 'Leopaldstr. 1',
    state: 0,
    customerName: 'Hello 1',
    delivererName: 'World 1',
  },
  {
    id: 2,
    name: 'box 2',
    address: 'Leopaldstr. 2',
    state: 0,
    customerName: 'Hello 2',
    delivererName: 'World 2',
  },
  {
    id: 3,
    name: 'box 3',
    address: 'Leopaldstr. 3',
    state: 1,
    customerName: 'Hello 3',
    delivererName: 'World 3',
  },
]);

mock.onPut(/\/api\/delivery\/.*/).reply(({ data }) => [ 200, data ]);

mock.onPost(/\/api\/delivery\/.*/).reply(({ data }) => {
  // possible modifications to add unique keys
  return [ 200, data ];
});

mock.onDelete(/\/api\/delivery\/.*/).reply(200);

export default mockAPIInstance;
