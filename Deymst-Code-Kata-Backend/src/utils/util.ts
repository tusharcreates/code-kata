/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */

export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export function extractCookies(cookieStr) {
  if (cookieStr) {
    let output = {};
    var the_cookie = cookieStr.split(';');
    the_cookie.forEach((element: any, index: number) => {
      var temp: string[] = element.split('=');
      output[String(temp[0]).trim()] = temp[1];
    });
    return output;
  }
  return null;
}

export function isValidHttpUrl(string: string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (err) {
    return false;
  }
}
