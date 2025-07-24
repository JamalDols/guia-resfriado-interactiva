import FlujoResfriado from "@/components/FlujoResfriado";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🤧 Guía Interactiva para el Resfriado</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Responde las preguntas para recibir recomendaciones personalizadas sobre cómo tratar tus síntomas</p>
        </header>

        <FlujoResfriado />

        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>⚠️ Esta guía es solo informativa. Consulta con un profesional médico si los síntomas persisten o empeoran.</p>
        </footer>
      </div>
    </div>
  );
}
