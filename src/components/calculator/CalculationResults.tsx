
import React from 'react';
import { Card } from '../ui/card';
import type { PerformanceMetrics } from '../../utils/performanceMonitor';

interface CalculationResult {
  result: number | null;
  executionTime: number;
  metrics?: PerformanceMetrics;
}

interface CalculationResultsProps {
  wasmResult: CalculationResult;
  jsResult: CalculationResult;
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'ackermann';
}

export const CalculationResults: React.FC<CalculationResultsProps> = ({ wasmResult, jsResult, operation }) => {
  if (wasmResult.result === null && jsResult.result === null) return null;

  const renderMetrics = (metrics?: PerformanceMetrics) => {
    if (!metrics || operation !== 'ackermann') return null;

    return (
      <div className="mt-2 text-sm space-y-1 text-purple-200">
        <p>Total Recursive Calls: {metrics.totalCalls}</p>
        <p>Maximum Recursion Depth: {metrics.maxDepth}</p>
        <p>Average Step Time: {(metrics.stepTimes.reduce((a, b) => a + b, 0) / metrics.stepTimes.length).toFixed(4)}ms</p>
      </div>
    );
  };

  return (
    <div className="space-y-4 text-white">
      <div className={`p-4 rounded-lg ${operation === 'ackermann' ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-white/5'}`}>
        <h3 className="font-semibold text-purple-200">WebAssembly</h3>
        <p className="text-xl">Result: {wasmResult.result}</p>
        <p className="text-sm text-purple-200">Time: {wasmResult.executionTime.toFixed(4)}ms</p>
        {renderMetrics(wasmResult.metrics)}
      </div>
      
      <div className={`p-4 rounded-lg ${operation === 'ackermann' ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-white/5'}`}>
        <h3 className="font-semibold text-purple-200">JavaScript</h3>
        <p className="text-xl">Result: {jsResult.result}</p>
        <p className="text-sm text-purple-200">Time: {jsResult.executionTime.toFixed(4)}ms</p>
        {renderMetrics(jsResult.metrics)}
      </div>
    </div>
  );
};
