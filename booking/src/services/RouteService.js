import apiClient from './axiosConfig';

class RouteService {
  getAllRoutes() {
    return apiClient.get('routes/');
  }

  getRouteById(routeId) {
    return apiClient.get(`routes/${routeId}/`);
  }

  createRoute(routeData) {
    return apiClient.post('routes/', routeData);
  }

  updateRoute(routeId, routeData) {
    return apiClient.put(`routes/${routeId}/`, routeData);
  }

  deleteRoute(routeId) {
    return apiClient.delete(`routes/${routeId}/`);
  }
}

export default new RouteService();
