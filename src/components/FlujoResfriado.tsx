"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: "inicio",
    question: "¿Te notas resfriado/a o con síntomas leves?",
    options: [
      { label: "No", result: "No necesitas tratamiento. Si notas algo más adelante, vuelve a empezar." },
      { label: "Sí", next: "fiebre" },
    ],
  },
  {
    id: "fiebre",
    question: "¿Tienes fiebre?",
    options: [
      { label: "No", next: "mucosidad" },
      { label: "Sí, menor de 38°C", next: "mucosidad" },
      { label: "Sí, 38°C o más", next: "fiebre_dias" },
    ],
  },
  {
    id: "fiebre_dias",
    question: "¿Llevas más de 3 días con fiebre?",
    options: [
      { label: "Sí", result: "Consulta médica. Podría ser infección bacteriana." },
      { label: "No", next: "mucosidad" },
    ],
  },
  {
    id: "mucosidad",
    question: "¿Tienes mucosidad nasal?",
    options: [
      { label: "No", next: "garganta" },
      { label: "Sí, clara o acuosa", result: "Resfriado leve. Usa lavados nasales con suero y antihistamínico si hay estornudos." },
      { label: "Sí, espesa o verdosa", result: "Posible infección. Usa lavados, mucolítico y vigila la fiebre." },
    ],
  },
  {
    id: "garganta",
    question: "¿Te duele la garganta?",
    options: [
      { label: "No", next: "tos" },
      { label: "Sí, leve", result: "Miel con limón o pastillas para chupar con benzocaína." },
      { label: "Sí, fuerte al tragar", result: "Ibuprofeno y antiséptico bucofaríngeo." },
    ],
  },
  {
    id: "tos",
    question: "¿Tienes tos?",
    options: [
      { label: "No", next: "fatiga" },
      { label: "Sí, tos seca", next: "tos_seca" },
      { label: "Sí, tos con mucosidad", result: "Usa mucolíticos o expectorantes." },
    ],
  },
  {
    id: "tos_seca",
    question: "¿Te impide dormir?",
    options: [
      { label: "Sí", result: "Antitusivo nocturno como dextrometorfano o cloperastina." },
      { label: "No", result: "Miel y reposo." },
    ],
  },
  {
    id: "fatiga",
    question: "¿Estás muy cansado o con malestar general?",
    options: [
      { label: "Sí", result: "Descansa, hidrátate y usa paracetamol si es necesario." },
      { label: "No", result: "Sigue tu rutina con precaución." },
    ],
  },
];

export default function FlujoResfriado() {
  const [stepId, setStepId] = useState("inicio");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>(["inicio"]);

  const step = steps.find((s) => s.id === stepId);
  const stepIndex = steps.findIndex((s) => s.id === stepId) + 1;

  const handleOption = (option: { label: string; result?: string; next?: string }) => {
    if (option.result) {
      setResult(option.result);
    } else if (option.next) {
      setStepId(option.next);
      setHistory([...history, option.next]);
    }
  };

  const resetFlow = () => {
    setStepId("inicio");
    setResult(null);
    setHistory(["inicio"]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setStepId(newHistory[newHistory.length - 1]);
    }
  };

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.1 },
    },
    tap: { scale: 0.98 },
  };

  if (result) {
    return (
      <motion.div className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col justify-center" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 text-center shadow-lg" variants={itemVariants}>
          <motion.div className="text-6xl mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
            ✅
          </motion.div>
          <motion.h2 className="text-2xl font-bold text-gray-800 mb-4" variants={itemVariants}>
            Recomendación
          </motion.h2>
          <motion.p className="text-lg text-gray-700 mb-6 leading-relaxed" variants={itemVariants}>
            {result}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button onClick={resetFlow} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Volver a empezar
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div key={stepId} initial="hidden" animate="visible" exit="exit" variants={containerVariants} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Progress bar */}
          <motion.div className="mb-6" variants={itemVariants}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Paso {stepIndex} de {steps.length}
              </span>
              <span className="text-sm text-gray-500">{Math.round((stepIndex / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div className="bg-blue-600 h-2 rounded-full" initial={{ width: 0 }} animate={{ width: `${(stepIndex / steps.length) * 100}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
            </div>
          </motion.div>

          {/* Question */}
          <motion.h2 className="text-2xl font-bold text-gray-800 mb-6 leading-tight" variants={itemVariants}>
            {step?.question}
          </motion.h2>

          {/* Options */}
          <motion.div className="space-y-3" variants={itemVariants}>
            {step?.options.map((option, index) => (
              <motion.div key={index} variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => handleOption(option)}
                  variant="outline"
                  size="lg"
                  className="w-full text-left justify-start p-4 h-auto min-h-[60px] border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <span className="text-base leading-relaxed">{option.label}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation */}
          {history.length > 1 && (
            <motion.div className="mt-6 pt-6 border-t border-gray-200" variants={itemVariants}>
              <Button onClick={goBack} variant="secondary" className="text-gray-600 hover:text-gray-800">
                ← Volver atrás
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
