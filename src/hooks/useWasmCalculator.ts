
import { useState, useEffect } from 'react';
import { jsCalculator } from '../utils/jsCalculator';

interface WasmExports {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
  ackermann: (m: number, n: number) => number;
}

export const useWasmCalculator = () => {
  const [wasmModule, setWasmModule] = useState<WasmExports | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        // WebAssemblyモジュールがロードされるまでのプレースホルダー
        // 実際のWasmモジュールが用意できたら、ここを更新します
        setWasmModule({
          add: jsCalculator.add,
          subtract: jsCalculator.subtract,
          multiply: jsCalculator.multiply,
          divide: jsCalculator.divide,
          ackermann: jsCalculator.ackermann,
        });
        setLoading(false);
      } catch (err) {
        setError('WebAssemblyモジュールの読み込みに失敗しました');
        setLoading(false);
      }
    };

    loadWasm();
  }, []);

  return { wasmModule, loading, error };
};
