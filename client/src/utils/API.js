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
  },
  getSymbols: function() {
    return axios.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bpul0uvrh5rd45tk1jrg');
  },
  getMutualFundSymbols: function() {
    return axios.get('https://finnhub.io/api/v1/stock/symbol?exchange=mutualFund&token=bpul0uvrh5rd45tk1jrg');
  },
  getIndexPrices: function(index) {
    return axios.get(`https://finnhub.io/api/v1/quote?symbol=^${index}&token=bpul0uvrh5rd45tk1jrg`);
  },
  getCurrentStockPrice: function(symbol) {
    return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=1BGUWMMYKV1JPI0R`);
  },
  // Gets all posts
  getPosts: function() {
    return axios.get("/api/posts");
  },
  // Gets the post with the given id
  getPost: function(id) {
    return axios.get("/api/posts/" + id);
  },
  // Deletes the post with the given id
  deletePost: function(id) {
    return axios.delete("/api/posts/" + id);
  },
  // Saves a post to the database
  savePost: function(postData) {
    return axios.post("/api/posts", postData);
  }
};

