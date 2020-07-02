import axios from "axios";

export default {
  get_credentials: () => {
    return axios.get('api/auth/get_credentials');
  },
  register_login: function(email, password) {
    return axios.post('api/auth/register_login', 
    {
      email: email,
      password: password,
    }
    );
  },
  logout: function() {
    return axios.get('api/auth/logout')
  }
};
