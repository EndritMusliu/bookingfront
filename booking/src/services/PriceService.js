import apiClient from './axiosConfig';

class PriceService {
  getAllPrices() {
    return apiClient.get('prices/');
  }

  getPriceById(priceId) {
    return apiClient.get(`prices/${priceId}/`);
  }

  createPrice(priceData) {
    return apiClient.post('prices/', priceData);
  }

  updatePrice(priceId, priceData) {
    return apiClient.put(`prices/${priceId}/`, priceData);
  }

  deletePrice(priceId) {
    return apiClient.delete(`prices/${priceId}/`);
  }
}

export default new PriceService();
