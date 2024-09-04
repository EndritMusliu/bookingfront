import apiClient from './axiosConfig';

class BankDetailService {
  getAllBankDetails() {
    return apiClient.get('bankdetails/');
  }

  getBankDetailById(bankDetailId) {
    return apiClient.get(`bankdetails/${bankDetailId}/`);
  }

  createBankDetail(bankDetailData) {
    return apiClient.post('bankdetails/', bankDetailData);
  }

  updateBankDetail(bankDetailId, bankDetailData) {
    return apiClient.put(`bankdetails/${bankDetailId}/`, bankDetailData);
  }

  deleteBankDetail(bankDetailId) {
    return apiClient.delete(`bankdetails/${bankDetailId}/`);
  }
}

export default new BankDetailService();
