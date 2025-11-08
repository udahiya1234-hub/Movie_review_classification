import React from 'react';
import { INSIGHTS, APP_NAME, APP_DESCRIPTION } from './constants';
import InsightCard from './components/InsightCard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12 max-w-4xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          {APP_NAME}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          {APP_DESCRIPTION}
        </p>
      </header>

      <section className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mb-12 w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Overall Conclusion from Validation</h2>
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
          Based on comprehensive validation steps, the observed 100% accuracy on the test dataset appears to be <span className="font-extrabold text-green-800">reliable</span>, and the model demonstrates <span className="font-extrabold text-green-800">strong generalization capabilities</span> on this specific dataset and task.
        </p>
        <div className="flex items-center justify-center flex-col sm:flex-row">
          <div className="relative bg-white text-4xl font-black p-6 rounded-full shadow-xl animate-pulse-once border-4 border-green-300 mb-4 sm:mb-0 sm:mr-6 flex items-center justify-center w-36 h-36">
            <span className="text-7xl font-black text-green-700">100%</span>
            <span className="absolute -top-4 -right-4 text-green-700 bg-white p-2 rounded-full text-2xl font-bold shadow-md transform rotate-12">✓</span>
          </div>
          <p className="text-2xl font-semibold text-green-700">Consistent Accuracy Achieved!</p>
        </div>
      </section>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {INSIGHTS.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </main>

      <footer className="mt-16 text-center text-gray-700 text-sm">
        <p>&copy; 2024 Model Validation Dashboard. All rights reserved.</p>
        <p>Powered by Google Colab Notebook Insights.</p>
      </footer>
    </div>
  );
};

export default App;