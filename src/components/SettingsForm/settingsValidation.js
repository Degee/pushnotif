import memoize from 'lru-memoize';
import {createValidator, match, required} from 'utils/validation';

const settingsValidation = createValidator({
  passwordConfirm: [match('password')]
});
export default memoize(10)(settingsValidation);
