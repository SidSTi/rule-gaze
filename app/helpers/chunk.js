import { helper } from '@ember/component/helper';

export function chunk([numerator, denominator]/*, hash*/) {
  return Math.round((+numerator / +denominator) * 100);
}

export default helper(chunk);
