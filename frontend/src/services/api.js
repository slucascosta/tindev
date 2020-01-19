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
    async getUser(id) {
      const response = await api.get(`devs/${id}`);

      return response.data;
    },
    async getUsers(id) {
      const response = await api.get('/devs', {
        headers: { user: id }
      });

      return response.data;
    },
    async like(loggedUser, id) {
      await api.post(`/devs/${id}/likes`, null, {
        headers: { user: loggedUser }
      });
    },
    async dislike(loggedUser, id) {
      await api.post(`/devs/${id}/dislikes`, null, {
        headers: { user: loggedUser }
      });
    }
  }
})();