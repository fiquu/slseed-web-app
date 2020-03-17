import moment from 'moment';

import config from '@/configs/moment';

/**
 * Add more (or none) locales here as needed.
 *
 * IMPORTANT: "EN" is loaded by default.
 *
 * @see https://momentjs.com/docs/#/i18n/loading-into-nodejs/
 */
import 'moment/locale/es';

moment.locale(config.locale);

export default moment;
