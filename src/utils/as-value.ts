import asArray from './as-array';

export default function asValue(v: any) {
  return asArray(v)?.[0];
}
