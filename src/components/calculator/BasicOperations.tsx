
import React from 'react';
import { Button } from '../ui/button';
import { Calculator } from 'lucide-react';

interface BasicOperationsProps {
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'ackermann';
  setOperation: (op: 'add' | 'subtract' | 'multiply' | 'divide' | 'ackermann') => void;
}

export const BasicOperations: React.FC<BasicOperationsProps> = ({ operation, setOperation }) => {
  return (
    <div className="p-4 bg-white/5 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-5 h-5 text-blue-300" />
        <h3 className="text-blue-300 font-medium">Basic Operations</h3>
      </div>
      <div className="flex gap-2 flex-wrap">
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
    </div>
  );
};
