import { PerformanceMonitor } from './performanceMonitor';

const monitor = new PerformanceMonitor();

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
    monitor.reset();
    return ackermannWithMonitoring(m, n);
  },
  getPerformanceMetrics: () => {
    return monitor.getMetrics();
  }
};

function ackermannWithMonitoring(m: number, n: number): number {
  const startTime = performance.now();
  monitor.recordStep(startTime);

  let result: number;
  if (m === 0) {
    result = n + 1;
  } else if (n === 0) {
    result = ackermannWithMonitoring(m - 1, 1);
  } else {
    result = ackermannWithMonitoring(m - 1, ackermannWithMonitoring(m, n - 1));
  }

  monitor.decreaseDepth();
  return result;
}
