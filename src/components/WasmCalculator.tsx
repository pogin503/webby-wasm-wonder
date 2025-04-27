
import React, { useState } from 'react';
import { useWasmCalculator } from '../hooks/useWasmCalculator';
import { jsCalculator } from '../utils/jsCalculator';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

interface CalculationResult {
  result: number | null;
  executionTime: number;
}

const WasmCalculator = () => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
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
        if (b === 0) {
          setWasmResult({ result: null, executionTime: 0 });
          setJsResult({ result: null, executionTime: 0 });
          return;
        }
        wasmCalculatedResult = wasmModule.divide(a, b);
        break;
    }
    const wasmEndTime = performance.now();
    setWasmResult({
      result: wasmCalculatedResult,
      executionTime: wasmEndTime - wasmStartTime
    });

    // JavaScript calculation
    const jsStartTime = performance.now();
    let jsCalculatedResult: number;
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
        jsCalculatedResult = jsCalculator.divide(a, b);
        break;
    }
    const jsEndTime = performance.now();
    setJsResult({
      result: jsCalculatedResult,
      executionTime: jsEndTime - jsStartTime
    });
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
            className="bg-white/5 text-white"
          />
          <Input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Second number"
            className="bg-white/5 text-white"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={operation === 'add' ? 'default' : 'secondary'}
            onClick={() => setOperation('add')}
            className="flex-1"
          >
            +
          </Button>
          <Button
            variant={operation === 'subtract' ? 'default' : 'secondary'}
            onClick={() => setOperation('subtract')}
            className="flex-1"
          >
            -
          </Button>
          <Button
            variant={operation === 'multiply' ? 'default' : 'secondary'}
            onClick={() => setOperation('multiply')}
            className="flex-1"
          >
            ×
          </Button>
          <Button
            variant={operation === 'divide' ? 'default' : 'secondary'}
            onClick={() => setOperation('divide')}
            className="flex-1"
          >
            ÷
          </Button>
        </div>
        
        <Button onClick={calculate} className="w-full bg-purple-600 hover:bg-purple-700">
          Calculate
        </Button>
        
        {(wasmResult.result !== null || jsResult.result !== null) && (
          <div className="space-y-4 text-white">
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-semibold text-purple-200">WebAssembly</h3>
              <p className="text-xl">Result: {wasmResult.result}</p>
              <p className="text-sm text-purple-200">Time: {wasmResult.executionTime.toFixed(4)}ms</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-semibold text-purple-200">JavaScript</h3>
              <p className="text-xl">Result: {jsResult.result}</p>
              <p className="text-sm text-purple-200">Time: {jsResult.executionTime.toFixed(4)}ms</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WasmCalculator;
