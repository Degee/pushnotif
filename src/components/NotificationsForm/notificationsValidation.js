import memoize from 'lru-memoize';
import {createValidator, required, maxLength} from 'utils/validation';

const notificationsValidation = createValidator({
  title: [required, maxLength(30)],
  text: [required, maxLength(100)],
  datetime: [required],
});
export default memoize(10)(notificationsValidation);
