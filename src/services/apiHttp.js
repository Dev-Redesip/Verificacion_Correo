import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3008';

const apiService = {

  postVerificacion: async (token) => {  
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/verificacion`, {token: token});
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  },
};

export default apiService;