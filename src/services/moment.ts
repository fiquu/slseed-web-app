/**
 * Moment service module.
 *
 * @module services/moment
 */

import moment from 'moment';

import config from '@/configs/moment';

// Add more (or none) locales here as needed...
// IMPORTANT: "EN" is loaded by default
import 'moment/locale/es';

moment.locale(config.locale);

export default moment;
