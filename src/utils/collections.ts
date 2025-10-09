import _ from 'lodash';

export function asArray(data: any) {
  return _([data])
    .flatten()
    .compact()
    .value();
}

export function asValue(v: any) {
  return asArray(v)[0];
}

export function sortBy(key: string, dir: 'asc' | 'desc', caseInsensitive = true) {
  const applyCase = (v: any) => caseInsensitive && typeof (v) === "string"
    ? v.toLowerCase()
    : v;
  const sortValue = dir === 'asc' ? 1 : -1;

  return (a: any, b: any) => {
    let valA = a !== undefined && a[key] !== undefined && a[key];
    let valB = b !== undefined && b[key] !== undefined && b[key];
    const gotString = typeof (valA) === 'string' || typeof (valB) === 'string';

    // default empty string or 0
    if (valA === undefined) valA = gotString ? '' : 0;
    if (valB === undefined) valB = gotString ? '' : 0;

    if (applyCase(valA) > applyCase(valB)) {
      return sortValue;
    } else if (applyCase(valA) < applyCase(valB)) {
      return -1 * sortValue;
    }

    return 0;
  }
}