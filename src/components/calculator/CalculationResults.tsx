
import React from 'react';

interface CalculationResult {
  result: number | null;
  executionTime: number;
}

interface CalculationResultsProps {
  wasmResult: CalculationResult;
  jsResult: CalculationResult;
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'ackermann';
}

export const CalculationResults: React.FC<CalculationResultsProps> = ({ wasmResult, jsResult, operation }) => {
  if (wasmResult.result === null && jsResult.result === null) return null;

  return (
    <div className="space-y-4 text-white">
      <div className={`p-4 rounded-lg ${operation === 'ackermann' ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-white/5'}`}>
        <h3 className="font-semibold text-purple-200">WebAssembly</h3>
        <p className="text-xl">Result: {wasmResult.result}</p>
        <p className="text-sm text-purple-200">Time: {wasmResult.executionTime.toFixed(4)}ms</p>
      </div>
      
      <div className={`p-4 rounded-lg ${operation === 'ackermann' ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-white/5'}`}>
        <h3 className="font-semibold text-purple-200">JavaScript</h3>
        <p className="text-xl">Result: {jsResult.result}</p>
        <p className="text-sm text-purple-200">Time: {jsResult.executionTime.toFixed(4)}ms</p>
      </div>
    </div>
  );
};
