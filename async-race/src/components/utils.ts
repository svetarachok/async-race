export const getRandomName = (object: object) => {
  let res = '';
  const arrOfFirstNames: string[] = Object.keys(object);
  const arrOfSecNames: Array<string>[] = Object.values(object);
  const firstName = arrOfFirstNames[Math.floor(Math.random() * arrOfFirstNames.length)];
  const index = arrOfFirstNames.indexOf(firstName);
  const randInd = Math.floor(Math.random() * arrOfSecNames.length);
  const secName = arrOfSecNames[index][Math.floor(Math.random() * arrOfSecNames[randInd].length)];
  res = `${firstName} ${secName}`;
  return res;
};

export const getRandomColor = () => {
  const number = Math.floor(Math.random() * 16777215).toString(16);
  const res = `#${number}`;
  return res;
};

export const getRandomCarsData = (obj: object) => {
  const nameC = getRandomName(obj);
  const colorC = getRandomColor();
  const res = { name: nameC, color: colorC };
  return res;
};

export const getElementCenter = (elem: HTMLElement) => {
  const {
    top, left, width, height,
  } = elem.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

export const getDistance = (elem1: HTMLElement, elem2: HTMLElement) => {
  const elem1Position = getElementCenter(elem1);
  const elem2Position = getElementCenter(elem2);
  return Math.hypot(elem1Position.x - elem2Position.x, elem1Position.y - elem2Position.y);
};

// export function once (fn: Function): boolean | undefined {
//   let isExecuted = false;
//   return (...args: []) => {
//     if(!isExecuted){
//       isExecuted = true;
//       return fn(...args);
//     } else {
//       return undefined;
//     }
//   }
// };
