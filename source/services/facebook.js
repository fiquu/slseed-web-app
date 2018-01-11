import config from '@/configs/facebook';

const id = 'facebook-jssdk';

const CONNECTED = 'connected';

const options = {
  login: {
    scope: 'public_profile,email',
    auth_type: 'rerequest'
  },
  me: {
    fields: 'gender,email,name,birthday'
  }
};

export default {
  loginStatus: null,
  /**
   * Initializes Facebook.
   */
  init() {
    return new Promise(resolve => {
      window.fbAsyncInit = () => {
        window.FB.init(config);

        window.FB.getLoginStatus(res => {
          this.loginStatus = res.status;
          resolve();
        }, true);
      };

      if (!document.getElementById(id)) {
        const script = document.createElement('script');

        script.src = 'https://connect.facebook.net/es_CL/sdk.js';
        script.async = true;
        script.defer = true;
        script.id = id;

        document.body.appendChild(script);
      } else {
        window.fbAsyncInit();
      }
    });
  },

  /**
   * Retrieves Facebook user login.
   */
  getLogin() {
    /* Workaround to avoid pop-up blocking */
    let resolve, reject;

    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    window.FB.login(res => {
      if (res && res.status === CONNECTED) {
        window.FB.api('/me', options.me, res => resolve(res));
        return;
      }

      reject(res.status);
    }, options.login);

    return promise;
  }
};
