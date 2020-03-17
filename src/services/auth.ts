import Auth from '@aws-amplify/auth';

import config from '@/configs/auth';

Auth.configure({ ...config });

export default Auth;
