
import React, { useState } from 'react';
import { useWasmCalculator } from '../hooks/useWasmCalculator';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

const WasmCalculator = () => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [result, setResult] = useState<number | null>(null);
  const { wasmModule, loading, error } = useWasmCalculator();

  const calculate = () => {
    if (!wasmModule) return;
    
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    
    if (isNaN(a) || isNaN(b)) {
      setResult(null);
      return;
    }

    let calculatedResult: number;
    switch (operation) {
      case 'add':
        calculatedResult = wasmModule.add(a, b);
        break;
      case 'subtract':
        calculatedResult = wasmModule.subtract(a, b);
        break;
      case 'multiply':
        calculatedResult = wasmModule.multiply(a, b);
        break;
      case 'divide':
        if (b === 0) {
          setResult(null);
          return;
        }
        calculatedResult = wasmModule.divide(a, b);
        break;
    }
    setResult(calculatedResult);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card className="p-6 w-full max-w-md mx-auto bg-white/10 backdrop-blur">
      <h2 className="text-2xl font-bold mb-4 text-purple-100">WebAssembly Calculator</h2>
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
        
        {result !== null && (
          <div className="text-2xl font-bold text-center py-4 text-white">
            = {result}
          </div>
        )}
      </div>
    </Card>
  );
};

export default WasmCalculator;
