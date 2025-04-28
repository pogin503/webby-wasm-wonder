
export interface PerformanceMetrics {
  totalCalls: number;
  maxDepth: number;
  stepTimes: number[];
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    totalCalls: 0,
    maxDepth: 0,
    stepTimes: []
  };
  private currentDepth = 0;

  reset() {
    this.metrics = {
      totalCalls: 0,
      maxDepth: 0,
      stepTimes: []
    };
    this.currentDepth = 0;
  }

  recordStep(startTime: number) {
    this.metrics.totalCalls++;
    this.currentDepth++;
    this.metrics.maxDepth = Math.max(this.metrics.maxDepth, this.currentDepth);
    this.metrics.stepTimes.push(performance.now() - startTime);
  }

  decreaseDepth() {
    this.currentDepth--;
  }

  getMetrics(): PerformanceMetrics {
    return this.metrics;
  }
}
