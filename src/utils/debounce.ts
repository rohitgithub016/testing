const debounce = (func: (val: string) => void, delay: number) => {
  let timeoutId: number;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      func(...args);
    }, delay);
  };
};

export default debounce;
