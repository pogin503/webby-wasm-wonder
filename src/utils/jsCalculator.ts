
export const jsCalculator = {
  add: (a: number, b: number): number => {
    return a + b;
  },
  subtract: (a: number, b: number): number => {
    return a - b;
  },
  multiply: (a: number, b: number): number => {
    return a * b;
  },
  divide: (a: number, b: number): number => {
    return a / b;
  },
  ackermann: (m: number, n: number): number => {
    if (m === 0) {
      return n + 1;
    } else if (n === 0) {
      return jsCalculator.ackermann(m - 1, 1);
    } else {
      return jsCalculator.ackermann(m - 1, jsCalculator.ackermann(m, n - 1));
    }
  }
};
