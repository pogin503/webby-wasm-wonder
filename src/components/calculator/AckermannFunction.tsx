
import React from 'react';
import { Button } from '../ui/button';
import { Code } from 'lucide-react';

interface AckermannFunctionProps {
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'ackermann';
  setOperation: (op: 'add' | 'subtract' | 'multiply' | 'divide' | 'ackermann') => void;
}

export const AckermannFunction: React.FC<AckermannFunctionProps> = ({ operation, setOperation }) => {
  return (
    <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
      <div className="flex items-center gap-2 mb-3">
        <Code className="w-5 h-5 text-purple-300" />
        <h3 className="text-purple-300 font-medium">Ackermann Function</h3>
      </div>
      <p className="text-sm text-purple-200 mb-3">
        Demonstrates computational intensity (try m=3, n=3)
      </p>
      <Button
        variant={operation === 'ackermann' ? 'default' : 'secondary'}
        onClick={() => setOperation('ackermann')}
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        Calculate Ackermann
      </Button>
    </div>
  );
};
