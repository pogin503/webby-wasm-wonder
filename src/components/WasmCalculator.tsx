
import React, { useState } from 'react';
import { useWasmCalculator } from '../hooks/useWasmCalculator';
import { jsCalculator } from '../utils/jsCalculator';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { BasicOperations } from './calculator/BasicOperations';
import { AckermannFunction } from './calculator/AckermannFunction';
import { CalculationResults } from './calculator/CalculationResults';

interface CalculationResult {
  result: number | null;
  executionTime: number;
}

const WasmCalculator = () => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide' | 'ackermann'>('add');
  const [wasmResult, setWasmResult] = useState<CalculationResult>({ result: null, executionTime: 0 });
  const [jsResult, setJsResult] = useState<CalculationResult>({ result: null, executionTime: 0 });
  const { wasmModule, loading, error } = useWasmCalculator();

  const calculate = () => {
    if (!wasmModule) return;
    
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    
    if (isNaN(a) || isNaN(b)) {
      setWasmResult({ result: null, executionTime: 0 });
      setJsResult({ result: null, executionTime: 0 });
      return;
    }

    // WebAssembly calculation
    const wasmStartTime = performance.now();
    let wasmCalculatedResult: number;
    try {
      switch (operation) {
        case 'add':
          wasmCalculatedResult = wasmModule.add(a, b);
          break;
        case 'subtract':
          wasmCalculatedResult = wasmModule.subtract(a, b);
          break;
        case 'multiply':
          wasmCalculatedResult = wasmModule.multiply(a, b);
          break;
        case 'divide':
          if (b === 0) throw new Error('Division by zero');
          wasmCalculatedResult = wasmModule.divide(a, b);
          break;
        case 'ackermann':
          wasmCalculatedResult = wasmModule.ackermann(a, b);
          break;
      }
      const wasmEndTime = performance.now();
      setWasmResult({
        result: wasmCalculatedResult,
        executionTime: wasmEndTime - wasmStartTime
      });
    } catch (error) {
      setWasmResult({ result: null, executionTime: 0 });
    }

    // JavaScript calculation
    const jsStartTime = performance.now();
    let jsCalculatedResult: number;
    try {
      switch (operation) {
        case 'add':
          jsCalculatedResult = jsCalculator.add(a, b);
          break;
        case 'subtract':
          jsCalculatedResult = jsCalculator.subtract(a, b);
          break;
        case 'multiply':
          jsCalculatedResult = jsCalculator.multiply(a, b);
          break;
        case 'divide':
          if (b === 0) throw new Error('Division by zero');
          jsCalculatedResult = jsCalculator.divide(a, b);
          break;
        case 'ackermann':
          jsCalculatedResult = jsCalculator.ackermann(a, b);
          break;
      }
      const jsEndTime = performance.now();
      setJsResult({
        result: jsCalculatedResult,
        executionTime: jsEndTime - jsStartTime
      });
    } catch (error) {
      setJsResult({ result: null, executionTime: 0 });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card className="p-6 w-full max-w-md mx-auto bg-white/10 backdrop-blur">
      <h2 className="text-2xl font-bold mb-4 text-purple-100">WebAssembly vs JavaScript Calculator</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="First number"
            className={`bg-white/5 text-white ${operation === 'ackermann' ? 'border-purple-500' : ''}`}
          />
          <Input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Second number"
            className={`bg-white/5 text-white ${operation === 'ackermann' ? 'border-purple-500' : ''}`}
          />
        </div>
        
        <BasicOperations operation={operation} setOperation={setOperation} />
        <AckermannFunction operation={operation} setOperation={setOperation} />
        
        <Button onClick={calculate} className="w-full bg-purple-600 hover:bg-purple-700">
          Calculate
        </Button>
        
        <CalculationResults
          wasmResult={wasmResult}
          jsResult={jsResult}
          operation={operation}
        />
      </div>
    </Card>
  );
};

export default WasmCalculator;
