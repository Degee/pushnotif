import memoize from 'lru-memoize';
import {createValidator, required, maxLength} from 'utils/validation';

const applicationsValidation = createValidator({
  name: [required, maxLength(50)]
});
export default memoize(10)(applicationsValidation);
