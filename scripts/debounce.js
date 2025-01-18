export const debounce = (fn, ms = 500) => {
  let timeoutId;

  return function (args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(args), ms);
  };
};
