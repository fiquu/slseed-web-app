/**
 * MQ plugin module.
 *
 * @module plugins/mq
 */

import VueMq from 'vue-mq';
import Vue from 'vue';

import config from '@/configs/mq';

Vue.use(VueMq, config);
