"use client";
import { RoundedButton } from "@/components/RoundedButton";
import { invoke } from "@tauri-apps/api/core";
import { listen, once } from "@tauri-apps/api/event";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface CalculationResult {
  result: number;
  timestamp: number;
  description: string;
}

interface ProcessStatus {
  id: number;
  memory_usage: number;
  cpu_usage: number;
  timestamp: number;
}

export default function Home() {
  const [greeted, setGreeted] = useState<string | null>(null);
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [operation, setOperation] = useState<string>("add");
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processStatuses, setProcessStatuses] = useState<ProcessStatus[]>([]);
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  
  const greet = useCallback((): void => {
    invoke<string>("greet")
      .then((s) => {
        setGreeted(s);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  const performCalculation = useCallback((): void => {
    setError(null);
    invoke<CalculationResult>("calculate", {
      a: firstNumber,
      b: secondNumber,
      operation: operation,
    })
      .then((result) => {
        setCalculationResult(result);
      })
      .catch((err: unknown) => {
        if (typeof err === "string") {
          setError(err);
        } else {
          setError("An unknown error occurred");
        }
        console.error(err);
      });
  }, [firstNumber, secondNumber, operation]);
  
  const startMonitoring = useCallback((): void => {
    // 重置状态
    setProcessStatuses([]);
    setIsMonitoring(true);
    
    // 调用Rust命令开始后台监控
    invoke("start_process_monitoring")
      .catch((err: unknown) => {
        console.error("Failed to start monitoring:", err);
        setIsMonitoring(false);
      });
  }, []);
  
  // 设置事件监听器
  useEffect(() => {
    // 清除之前的状态
    setProcessStatuses([]);
    
    const unlisten = listen<ProcessStatus>("process-status", (event) => {
      setProcessStatuses((current) => {
        const newStatuses = [...current, event.payload];
        // 只保留最近的5个状态
        if (newStatuses.length > 5) {
          return newStatuses.slice(newStatuses.length - 5);
        }
        return newStatuses;
      });
    });
    
    // 当事件接收到10次后，监听完成
    once("window-process-status", () => {
      // 这只是一个演示，实际上我们会在接收到某个特定事件时停止监控
      console.log("Received window-specific event");
    });
    
    return () => {
      // 在组件卸载时取消监听
      unlisten.then(unlistenFn => unlistenFn());
    };
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <h1 className="text-2xl font-bold">Tauri + Next.js Demo</h1>
        
        <div className="flex flex-col gap-4 items-start">
          <h2 className="text-xl font-semibold">Basic Greeting</h2>
          <RoundedButton
            onClick={greet}
            title="Call &quot;greet&quot; from Rust"
          />
          <p className="break-words w-md">
            {greeted ?? "Click the button to call the Rust function"}
          </p>
        </div>
        
        <div className="flex flex-col gap-4 items-start mt-8 p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Calculator Demo</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This demonstrates a more complex Rust function call with parameters and structured return data
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div>
              <label className="block text-sm font-medium mb-1">First Number</label>
              <input
                type="number"
                value={firstNumber}
                onChange={(e) => setFirstNumber(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Second Number</label>
              <input
                type="number"
                value={secondNumber}
                onChange={(e) => setSecondNumber(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Operation</label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="add">Add (+)</option>
              <option value="subtract">Subtract (-)</option>
              <option value="multiply">Multiply (×)</option>
              <option value="divide">Divide (÷)</option>
            </select>
          </div>
          
          <RoundedButton
            onClick={performCalculation}
            title="Calculate"
          />
          
          {error && (
            <div className="mt-2 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md">
              {error}
            </div>
          )}
          
          {calculationResult && (
            <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md w-full">
              <p><span className="font-medium">Result:</span> {calculationResult.result}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{calculationResult.description}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Timestamp: {new Date(calculationResult.timestamp).toLocaleString()}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-4 items-start mt-8 p-6 border rounded-lg shadow-sm w-full">
          <h2 className="text-xl font-semibold">Event System Demo</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This demonstrates the Tauri event system where Rust can send events to the frontend
          </p>
          
          <RoundedButton
            onClick={startMonitoring}
            title={isMonitoring ? "Monitoring..." : "Start Process Monitoring"}
            disabled={isMonitoring}
          />
          
          <div className="mt-4 w-full">
            <h3 className="text-lg font-medium mb-2">Process Status Events</h3>
            {processStatuses.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No events received yet. Click the button to start.</p>
            ) : (
              <div className="space-y-2">
                {processStatuses.map((status) => (
                  <div key={status.id} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Event #{status.id}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(status.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Memory: </span>
                        <span>{status.memory_usage} MB</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">CPU: </span>
                        <span>{(status.cpu_usage * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://v2.tauri.app/develop/calling-rust/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Tauri Documentation
        </a>
      </footer>
    </div>
  );
}
