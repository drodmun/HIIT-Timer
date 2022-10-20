/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const areObjectsDeeplyEqual = (objA: any, objB: any): boolean => {
  // If objA and objB reference the same value, return true since we can avoid comparisons
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  // If type is number and both NaN, return true since we can avoid comparisons
  if (typeof objA == 'number' && isNaN(objA) && isNaN(objB)) {
    return true;
  }

  // If type is number and both NaN, return true since we can avoid comparisons
  if (Array.isArray(objA) && Array.isArray(objB) && !(objA as []).length && !(objB as []).length) {
    return true;
  }

  let objectsDeeplyEqual = true;

  // If objA and objB aren't the same type, return false
  if (objectsDeeplyEqual && typeof objA != typeof objB) {
    objectsDeeplyEqual = false;
  }

  // Get internal [[Class]]
  const aClass = objA.toString();
  const bClass = objB.toString();

  // Return false if not same class
  if (objectsDeeplyEqual && aClass != bClass) {
    objectsDeeplyEqual = false;
  }

  // If they're Boolean, String or Number objects, check values
  if (
    objectsDeeplyEqual &&
    (aClass === '[object Boolean]' || aClass === '[object String]' || aClass === '[object Number]')
  ) {
    if (objA.valueOf() !== objB.valueOf()) {
      objectsDeeplyEqual = false;
    }
  }

  // If they're RegExps, Dates or Error objects, check stringify values
  if (
    objectsDeeplyEqual &&
    (aClass === '[object RegExp]' || aClass === '[object Date]' || aClass === '[object Error]')
  ) {
    if (objA.toString() !== objB.toString()) {
      objectsDeeplyEqual = false;
    }
  }

  // For functions, check stringify values are the same
  // Almost impossible to be equal if objA and objB aren't trivial
  // and are different functions
  if (objectsDeeplyEqual && aClass === '[object Function]' && objA.toString() !== objB.toString()) {
    objectsDeeplyEqual = false;
  }

  // For all objects, (including Objects, Functions, Arrays and host objects),
  // check the properties
  const aKeys = objA ? CommonUtils.getKeys(objA) : [];
  const bKeys = objB ? CommonUtils.getKeys(objB) : [];

  // If they don't have the same number of keys, return false
  if (objectsDeeplyEqual && aKeys.length !== bKeys.length) {
    objectsDeeplyEqual = false;
  }

  // Check they have the same keys
  if (objectsDeeplyEqual && !aKeys.some((k) => !(k in objB))) {
    objectsDeeplyEqual = false;
  }

  // Check key values
  objectsDeeplyEqual = objectsDeeplyEqual && aKeys.every((k) => areObjectsDeeplyEqual(objA[k], objB[k]));

  return objectsDeeplyEqual;
};

const isJson = (item: unknown): boolean => {
  let isJsonType = false;

  try {
    const itemStr: string = typeof item !== 'string' ? JSON.stringify(item) : item;
    item = JSON.parse(itemStr);

    if (item !== undefined && item !== null) {
      isJsonType = true;
    }
  } catch (e) {
    isJsonType = false;
  }

  return isJsonType;
};

const deepCopy = <T>(obj: T): T => {
  let copy: any;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || 'object' != typeof obj) {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    (obj as Array<any>).forEach((element, index) => {
      copy[index] = deepCopy(element);
    });
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {} as any;
    Object.keys(obj).forEach((k) => (copy[k] = deepCopy((obj as any)[k])));
    return copy;
  }

  throw new Error('Unable to copy obj!');
};

const formatNumber = (n: number, d = 0): string =>
  Intl.NumberFormat('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);
const countDecimals = (value: number): number =>
  Math.floor(value) !== value ? Math.floor(Math.abs(Math.log10(value))) : 0;

const getCurrencySymbol = (currency: string) =>
  (0)
    .toLocaleString('en-GB', {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    .replace(/\d/g, '')
    .trim();

const getKeys = <T extends Record<string, unknown>>(o: T): Array<keyof T> => <Array<keyof T>>Object.keys(o);

const subtractMonths = (monthSelected: Date, numOfMonths: number) => {
  const dateCopy = new Date(monthSelected);
  dateCopy.setMonth(dateCopy.getMonth() - numOfMonths);
  return dateCopy;
};

const MapMultiProps = <T extends object>(array: T[], properties: (keyof T)[]) =>
  array.map((obj) =>
    Object.keys(obj)
      .map((k) => k as keyof T)
      .reduce((acc: T, key) => {
        if (properties.includes(key)) {
          acc[key] = obj[key];
        }
        return acc;
      }, {} as T)
  );

const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

const CommonUtils = {
  areObjectsDeeplyEqual,
  isJson,
  deepCopy,
  formatNumber,
  countDecimals,
  getCurrencySymbol,
  getKeys,
  subtractMonths,
  MapMultiProps,
  scrollToTop
};
export default CommonUtils;
