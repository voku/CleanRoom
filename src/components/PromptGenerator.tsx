import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Copy, CircleCheck, RefreshCcw, ShieldAlert, Info } from 'lucide-react';

const steps = [
  {
    title: "1. Define the Goal",
    description: "What is the exact behavior or functionality you need to reproduce?",
    fields: [
      { 
        name: "goal", 
        label: "System Goal", 
        type: "textarea", 
        placeholder: "e.g., A command-line tool that parses JSON logs and outputs aggregated metrics...",
        tooltip: "Describe the core purpose of the system. Focus strictly on 'what' it does, not 'how' it does it. Avoid mentioning specific algorithms or internal architectures if they aren't strictly required."
      }
    ]
  },
  {
    title: "2. Input/Output Specification",
    description: "Define the exact inputs the system receives and the expected outputs.",
    fields: [
      { 
        name: "inputs", 
        label: "Inputs", 
        type: "textarea", 
        placeholder: "e.g., JSON file with schema { timestamp, level, message }",
        tooltip: "List all data sources, formats, and parameters the system will accept. Be as specific as possible about schemas and data types."
      },
      { 
        name: "outputs", 
        label: "Outputs", 
        type: "textarea", 
        placeholder: "e.g., A summary table grouped by log level",
        tooltip: "Describe the exact format and structure of the expected result. Include details about side effects (like writing to a database or file)."
      }
    ]
  },
  {
    title: "3. Constraints & Environment",
    description: "What are the technical constraints for this implementation?",
    fields: [
      { 
        name: "language", 
        label: "Programming Language", 
        type: "text", 
        placeholder: "e.g., Python 3.10+",
        tooltip: "Specify the exact programming language and version required for the implementation."
      },
      { 
        name: "dependencies", 
        label: "Allowed Dependencies", 
        type: "text", 
        placeholder: "e.g., Standard library only",
        tooltip: "List any allowed third-party libraries or frameworks. If none are allowed, explicitly state 'No external dependencies'."
      }
    ]
  },
  {
    title: "4. Test Cases",
    description: "Provide the behavioral tests the system must pass.",
    fields: [
      { 
        name: "tests", 
        label: "Behavioral Tests", 
        type: "textarea", 
        placeholder: "e.g., Test 1: Empty file -> returns 0. Test 2: Invalid JSON -> throws ParseError.",
        tooltip: "Provide specific scenarios the system must handle correctly. Include edge cases, error handling expectations, and performance requirements if applicable."
      }
    ]
  }
];

const STORAGE_KEY = 'cleanRoomPromptGeneratorState';

export default function PromptGenerator() {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.currentStep || 0;
      } catch (e) {
        console.error("Failed to parse saved step", e);
      }
    }
    return 0;
  });

  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.formData || {};
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
    return {};
  });

  const [copied, setCopied] = useState(false);

  // Auto-save to localStorage whenever formData or currentStep changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStep, formData }));
  }, [currentStep, formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setFormData({});
    setCopied(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const generatePrompt = () => {
    return `You are acting as a "Clean Room" engineering team. You have not seen the original source code of the system you are about to build. You must implement the system strictly based on the following behavioral specification.

## 1. Goal
${formData.goal || '[Not provided]'}

## 2. Inputs & Outputs
**Inputs:**
${formData.inputs || '[Not provided]'}

**Outputs:**
${formData.outputs || '[Not provided]'}

## 3. Constraints
**Language:** ${formData.language || '[Not provided]'}
**Dependencies:** ${formData.dependencies || '[Not provided]'}

## 4. Test Cases to Pass
${formData.tests || '[Not provided]'}

Please generate the complete, production-ready code that satisfies these requirements and passes all tests. Do not include any code from existing proprietary implementations.`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLastStep = currentStep === steps.length;

  return (
    <div id="generator" className="flex flex-col h-full bg-white text-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="bg-slate-800 p-6 text-white flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#5C9E9A]" />
            Clean Room Prompt Generator
          </h2>
          <p className="text-slate-300 text-sm mt-1">Build safe, independent implementations</p>
        </div>
        <div className="text-sm font-mono bg-slate-700 px-3 py-1 rounded-full text-slate-200">
          {isLastStep ? 'DONE' : `STEP ${currentStep + 1}/${steps.length}`}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          {!isLastStep ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-2 text-slate-800">{steps[currentStep].title}</h3>
              <p className="text-slate-600 mb-8">{steps[currentStep].description}</p>

              <div className="space-y-6 flex-1">
                {steps[currentStep].fields.map((field) => (
                  <div key={field.name} className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        {field.label}
                      </label>
                      {field.tooltip && (
                        <div className="relative group flex items-center">
                          <Info className="w-4 h-4 text-slate-400 hover:text-[#5C9E9A] cursor-help transition-colors" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs leading-relaxed rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                            {field.tooltip}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#5C9E9A] focus:border-[#5C9E9A] outline-none transition-all resize-none h-32 font-mono text-sm bg-slate-50 focus:bg-white"
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#5C9E9A] focus:border-[#5C9E9A] outline-none transition-all font-mono text-sm bg-slate-50 focus:bg-white"
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-[#52A474] flex items-center gap-2">
                  <CircleCheck className="w-6 h-6" />
                  Prompt Ready
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors text-sm font-medium"
                >
                  {copied ? <CircleCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
              <p className="text-slate-600 mb-4 text-sm">
                Paste this prompt into your preferred LLM to begin the clean room implementation.
              </p>
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800 leading-relaxed">
                  {generatePrompt()}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Controls */}
      <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
        {!isLastStep ? (
          <>
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-200 border border-transparent hover:border-slate-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-slate-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors shadow-sm"
            >
              {currentStep === steps.length - 1 ? 'Generate Prompt' : 'Next'} <ArrowRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            onClick={reset}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors w-full justify-center"
          >
            <RefreshCcw className="w-4 h-4" /> Start Over
          </button>
        )}
      </div>
    </div>
  );
}
