import React from 'react';
import { Insight } from '../types';

interface InsightCardProps {
  insight: Insight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const renderIcon = (id: string) => {
    switch (id) {
      case '1': // TF-IDF
        return <span className="text-green-500 text-2xl mr-2">✅</span>; // Checkmark for confirmation
      case '2': // Random State
      case '3': // K-Fold Cross-Validation
      case '4': // Class Sample Sizes
        return <span className="text-blue-500 text-2xl mr-2">📊</span>; // Bar chart icon for data visualization
      case '5': // Unseen Reviews
        return <span className="text-yellow-500 text-2xl mr-2">🔍</span>; // Magnifying glass icon for inspection
      default:
        return null;
    }
  };

  const renderOutcomeVisualization = (insight: Insight) => {
    const visualizationContainerClasses = "flex flex-col items-center justify-center p-4 rounded-md border border-gray-200 bg-gray-50 min-h-[150px] mt-4"; // Added min-h and mt-4
    
    switch (insight.id) {
      case '2': // Robustness to Data Split (Random State)
        return (
          <div className={visualizationContainerClasses}>
            <p className="text-green-700 font-medium mb-2">Accuracy Across Random Splits:</p>
            <div className="flex space-x-3 w-full max-w-xs justify-center"> {/* Increased space-x */}
              {[1, 2, 3].map((split) => (
                <div key={split} className="flex flex-col items-center">
                  <div className="bg-green-400 h-20 w-8 rounded-t-sm flex items-end justify-center">
                    <span className="text-xs font-bold text-white mb-1">100%</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">Split {split}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-800 text-sm mt-3 text-center px-2">"The model consistently achieved 100% accuracy even with different random splits."</p>
          </div>
        );
      case '3': // K-Fold Cross-Validation Results
        return (
          <div className={visualizationContainerClasses}>
            <p className="text-green-700 font-medium mb-2">Accuracy per K-Fold:</p>
            <div className="flex space-x-3 w-full max-w-xs justify-center items-end"> {/* Increased space-x */}
              {[1, 2, 3, 4, 5].map((fold) => (
                <div key={fold} className="flex flex-col items-center">
                  <div className="bg-green-400 h-24 w-8 rounded-t-sm flex items-end justify-center"> {/* Changed w-6 to w-8 */}
                    <span className="text-xs font-bold text-white mb-1">100%</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">Fold {fold}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-800 text-sm mt-3 text-center px-2">"100% accuracy in every single fold, with a standard deviation of 0.0."</p>
            <p className="text-md font-bold text-green-700 mt-2">Std Dev: 0.0</p>
          </div>
        );
      case '4': // Class Sample Size Analysis
        return (
          <div className={visualizationContainerClasses}>
            <p className="text-green-700 font-medium mb-6">Minimum Class Sample Sizes:</p> {/* Changed mb-4 to mb-6 */}
            <div className="flex space-x-4 w-full max-w-xs justify-center items-end py-2"> {/* Removed h-24, added py-2 */}
              <div className="flex flex-col items-center">
                <div className="bg-purple-300 h-16 w-10 rounded-t-sm flex items-end justify-center">
                  <span className="text-xs font-bold text-gray-800 mb-1">30</span>
                </div>
                <span className="text-xs text-gray-600 mt-1">Class A</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-purple-400 h-20 w-10 rounded-t-sm flex items-end justify-center">
                  <span className="text-xs font-bold text-white mb-1">55</span>
                </div>
                <span className="text-xs font-bold text-gray-600 mt-1">Class B</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-purple-500 h-24 w-10 rounded-t-sm flex items-end justify-center">
                  <span className="text-xs font-bold text-white mb-1">80</span>
                </div>
                <span className="text-xs text-gray-600 mt-1">Class C</span>
              </div>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center px-2">"Minimum number of samples for any class was 30, sufficient for evaluation."</p> {/* Changed mt-4 to mt-6 */}
          </div>
        );
      default:
        return (
          <div className={`${visualizationContainerClasses} flex-row`}> {/* Added flex-row for default layout */}
            {/* The icon is now rendered at the title level */}
            <div>
              <p className="text-green-700 font-medium mb-1">Outcome:</p>
              <p className="text-gray-800 text-base">{insight.outcome}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 flex flex-col">
      <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
        {renderIcon(insight.id)} {/* Always render the icon here */}
        {insight.title}
      </h3>
      <p className="text-gray-700 text-sm mb-4 flex-grow">{insight.description}</p>
      {renderOutcomeVisualization(insight)}
    </div>
  );
};

export default InsightCard;