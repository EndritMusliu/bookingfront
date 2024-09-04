import apiClient from './axiosConfig';

class FeedbackService {
  getAllFeedback() {
    return apiClient.get('feedback/');
  }

  getFeedbackById(feedbackId) {
    return apiClient.get(`feedback/${feedbackId}/`);
  }

  createFeedback(feedbackData) {
    return apiClient.post('feedback/', feedbackData);
  }

  updateFeedback(feedbackId, feedbackData) {
    return apiClient.put(`feedback/${feedbackId}/`, feedbackData);
  }

  deleteFeedback(feedbackId) {
    return apiClient.delete(`feedback/${feedbackId}/`);
  }
}

export default new FeedbackService();
