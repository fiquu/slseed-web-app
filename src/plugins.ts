// Plugins load list

import _router from '@/plugins/router';
import _store from '@/plugins/store';
import _i18n from '@/plugins/i18n';

import '@/plugins/local-storage';
import '@/plugins/validate';
import '@/plugins/session';
import '@/plugins/jquery';
import '@/plugins/moment';
import '@/plugins/toast';
import '@/plugins/auth';
import '@/plugins/api';
import '@/plugins/op';

export const router = _router;
export const store = _store;
export const i18n = _i18n;
