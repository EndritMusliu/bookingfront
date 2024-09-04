import apiClient from './axiosConfig';

class MealService {
  getAllMeals() {
    return apiClient.get('meals/');
  }

  getMealById(mealId) {
    return apiClient.get(`meals/${mealId}/`);
  }

  createMeal(mealData) {
    return apiClient.post('meals/', mealData);
  }

  updateMeal(mealId, mealData) {
    return apiClient.put(`meals/${mealId}/`, mealData);
  }

  deleteMeal(mealId) {
    return apiClient.delete(`meals/${mealId}/`);
  }
}

export default new MealService();
