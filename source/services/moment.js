/**
 * Moment service module.
 *
 * @module services/moment
 */

import moment from 'moment';

import config from '@/configs/moment';

moment.locale(config.locale);

export default moment;
