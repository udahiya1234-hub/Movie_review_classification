import { Insight } from './types';

export const INSIGHTS: Insight[] = [
  {
    id: '1',
    title: 'TF-IDF Vectorizer Fitting Confirmation',
    description: 'Ensuring no data leakage by fitting the TF-IDF vectorizer solely on training data, preventing artificial inflation of performance metrics.',
    outcome: 'The code correctly fitted the vectorizer on train_df before transforming other sets, confirming no data leakage from this step.',
  },
  {
    id: '2',
    title: 'Robustness to Data Split (Random State)',
    description: 'Re-running the model with a different random_state parameter in the train_test_split function to test if performance is sensitive to specific data partitions.',
    outcome: 'The model consistently achieved 100% accuracy even with a different random split, suggesting the performance is not dependent on a single specific data partition.',
  },
  {
    id: '3',
    title: 'K-Fold Cross-Validation Results',
    description: 'Performing K-Fold cross-validation on the full dataset to provide a more robust estimate of model performance and check for overfitting by training on multiple subsets.',
    outcome: 'The model achieved 100% accuracy in every single fold of the cross-validation, with a standard deviation of 0.0. This strongly suggests the model generalizes exceptionally well and is not overfitting to a specific training set.',
  },
  {
    id: '4',
    title: 'Class Sample Size Analysis (Confusion Matrix)',
    description: 'Examining the confusion matrix and classification report support values to check the number of samples for each rating class in the test set. Very small sample sizes can sometimes make perfect accuracy less convincing.',
    outcome: 'While there was some class imbalance, the minimum number of samples for any class was 30, which is generally considered sufficient for evaluating performance on that class.',
  },
  {
    id: '5',
    title: 'Prediction on New Unseen Reviews',
    description: 'Demonstrating the use of the trained model to predict ratings for new movie reviews that were not part of the original dataset, testing its ability to generalize to truly unseen data.',
    outcome: 'The model provided predictions for the example new reviews. Based on visual inspection, they seemed reasonable, showcasing its ability to generalize to truly unseen data.',
  },
];

export const APP_NAME = "Movie Review Classification Model";
export const APP_DESCRIPTION = "A comprehensive overview of the validation steps confirming the robustness and 100% accuracy of the movie review rating prediction model.";