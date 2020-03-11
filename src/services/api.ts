import API from '@aws-amplify/api';

import config from '@/configs/api';

API.configure(config);

export default API;
