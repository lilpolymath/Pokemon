const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  let range = max - min;
  return Math.floor(Math.random() * range) + min;
};

export default getRandomInt;
