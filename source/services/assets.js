/**
 * Assets service module.
 *
 * @module service/assets
 */

import config from '@/configs/assets';

export default rel => `${config.host || ''}/${rel}`;
