import flatten from 'lodash-es/flatten';
import compact from 'lodash-es/compact';

export default function asArray(data: any) {
  return compact(flatten([data]))
}
