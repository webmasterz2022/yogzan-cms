export const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'; //convert tablet
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

export function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export const bookingViaWA = () => {
  window.open('https://wa.me/message/SLS4NGOQZWLFF1', '_blank')
}

const regexNumber = /[^0-9]+/g;
export const thousandSeparator = (value) => (
  value && value.replace(regexNumber, '') && thousand(value.replace(/[^0-9]+/g, ''))
);

export const thousand = val => (
  Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
);

export const removeDot = val => {
  if (!val) {
    return val;
  } else if (typeof val === 'number') {
    return val.toString().replace(/\./g, '');
  }
  return val.replace(/\./g, '');
};

export const sortDate = (a, b, type, key) => {
  return new Date(a[key]) - new Date(b[key])
}