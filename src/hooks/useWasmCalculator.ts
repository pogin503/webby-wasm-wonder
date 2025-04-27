
import { useState, useEffect } from 'react';

interface WasmExports {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
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
          add: (a: number, b: number) => a + b,
          subtract: (a: number, b: number) => a - b,
          multiply: (a: number, b: number) => a * b,
          divide: (a: number, b: number) => a / b,
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
