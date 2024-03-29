import axios from 'axios';

const url = process.env.VUE_APP_SERVER_URL + '/products';

class ProductsService {
  get(params) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params: params })
          .then(res => resolve(res.data))
          .catch(err => reject(err));
    });
  }

  getFavouriteProducts(params) {
    return new Promise((resolve, reject) => {
        axios.get(url + '/favourite', { params: params })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    });
  }

  getProduct(id) {
    return new Promise((resolve, reject) => {
      axios.get(url + '/' + id, {
          withCredentials: true
      })
          .then(res => resolve(res.data))
          .catch(err => reject(err));
    });
  }

  post(formData) {
    return new Promise((resolve, reject) => {
      axios.post(url, formData,{
            headers: {
              "Content-Type": "multipart/form-data",
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            },
            withCredentials: true
          })
          .then(res => resolve(res.data))
          .catch(err => reject(err));
    });
  }

  put(formData, id) {
    return new Promise((resolve, reject) => {
      axios.put(
          url + '/' + id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            },
            withCredentials: true
          }
      )
          .then(res => resolve(res.data))
          .catch(err => reject(err));
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      axios.delete(url + '/' + id, {
        withCredentials: true,
          headers: {
              authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
      })
          .then(res => resolve(res.data))
          .catch(err => reject(err));
    });
  }
}

export default ProductsService;
