import axios from 'axios';

export default (() => {
  const api = axios.create({
    baseURL: 'http://localhost:3333'
  });

  return {
    async login(username) {
      const response = await api.post('/devs', { username });
      return response.data;
    },
    async getUsers(id) {
      const response = await api.get('/devs', {
        headers: { user: id }
      });

      return response.data;
    }
  }
})();