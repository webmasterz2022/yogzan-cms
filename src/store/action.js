import axios from 'axios'
import base64toFile from '../utils/base64ToFile'

export function login(form) {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: 'login', payload: true})
      const { data } = await axios({
        method: 'post',
        url: 'https://yogzan-api.cyclic.app/users/login',
        data: form
      })
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('username', data.username)
      dispatch({type: 'SET_LOADING', key: 'login', payload: false})
      window.location.href = '/'
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: 'login', payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function register(form) {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: 'register', payload: true})
      const { data } = await axios({
        method: 'post',
        url: 'https://yogzan-api.cyclic.app/users/register',
        // url: 'http://localhost:5000/users/register',
        data: form
      })
      dispatch({type: 'SET_LOADING', key: 'register', payload: false})
      alert('Berhasil Terdaftar! Silahkan login')
      window.location.href = '/login'
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: 'register', payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function getHomepageImages() {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: 'homepage', payload: true})
      const { data } = await axios({
        method: 'get',
        url: 'https://yogzan-api.cyclic.app/gallery/homepage',
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_HOMEPAGE' })
    } catch (error) {
      
    }
  }
}

export function getPortfolioImages(category, city) {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: 'portfolio', payload: true})
      const url = (category && category !== 'Semua') ? 
        `https://yogzan-api.cyclic.app/gallery/category/${category}?limit=1000${city ? `&city=${city}` : ''}` :
        `https://yogzan-api.cyclic.app/gallery/?limit=1000${city ? `&city=${city}` : ''}`
      const { data } = await axios({
        method: 'get',
        url
      })
      const indexingImage = data.images.map((img, i) => ({...img, index: i}))
      dispatch({ payload: {...data, images: indexingImage}, type: 'DATA_FETCHED_PORTFOLIO' })
    } catch (error) {
      
    }
  }
}

export function addPortfolio(portfolio, cb) {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: `addPortfolio`, payload: true})
      const form = new FormData()
      const convertedFile = base64toFile(portfolio.image, portfolio.name)
      form.append('images', convertedFile)
      form.append('name', portfolio.name)
      form.append('description', portfolio.description)
      form.append('vertical', portfolio.vertical)
      form.append('horizontal', portfolio.horizontal)
      form.append('category', portfolio.category)
      form.append('city', portfolio.city)
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-api.cyclic.app/gallery/upload`,
        // url: `http://localhost:5000/gallery/upload`,
        data: form,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      dispatch({type: 'SET_LOADING', key: `addPortfolio`, payload: false})
      cb()
      dispatch(getPortfolioImages(portfolio.category))
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: `addPortfolio`, payload: false})
      
    }
  }
}

export function updatePortfolio(portfolio, id) {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: `updatePortfolio-${id}`, payload: true})
      const form = new FormData()
      const isImageChanged = portfolio.image?.includes('base64')
      if(isImageChanged) {
        const convertedFile = base64toFile(portfolio.image, portfolio.imageName)
        form.append('images', convertedFile)
      } else {
        form.append('image', portfolio.image)
      }
      form.append('name', portfolio.name)
      form.append('description', portfolio.description)
      form.append('vertical', portfolio.vertical)
      form.append('horizontal', portfolio.horizontal)
      form.append('category', portfolio.category)
      form.append('city', portfolio.city)
      const { data } = await axios({
        method: 'put',
        url: `https://yogzan-api.cyclic.app/gallery/${id}`,
        // url: `http://localhost:5000/gallery/${id}`,
        data: form,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      dispatch({type: 'SET_LOADING', key: `updatePortfolio-${id}`, payload: false})
      dispatch(getPortfolioImages(portfolio.category))
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: `updatePortfolio-${id}`, payload: false})
    }
  }
}

export function deletePortfolio(category, id) {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: `deletePortfolio-${id}`, payload: true})
      const { data } = await axios({
        method: 'delete',
        url: `https://yogzan-api.cyclic.app/gallery/${id}`,
        // url: `http://localhost:5000/gallery/${id}`,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      dispatch({type: 'SET_LOADING', key: `deletePortfolio-${id}`, payload: false})
      dispatch(getPortfolioImages(category))
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: `deletePortfolio-${id}`, payload: false})
      
    }
  }
}

export function getCities(category) {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: 'city', payload: true})
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-api.cyclic.app/gallery/list-city`
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_CITY' })
    } catch (error) {
      
    }
  }
}

export function submitHiring(dataForm, cb) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: 'submitHiring', payload: true})
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-api.cyclic.app/hiring/submit`,
        // url: `http://localhost:5000/hiring/submit`,
        data: dataForm
      })
      dispatch({type: 'SET_LOADING', key: 'submitHiring', payload: false})
      cb()
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: 'submitHiring', payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function getAllHirings() {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: 'hiring', payload: true})
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-api.cyclic.app/hiring?limit=10000`,
        // url: `http://localhost:5000/hiring/`,
      })
      dispatch({ payload: {...data, data: data.data.map((e, i) => ({...e, idx: i+1}))}, type: 'DATA_FETCHED_HIRINGS' })
    } catch (error) {
      alert(error.response.data.err || error.message)
    }
  }
}

export function submitBooking(dataBooking, cb) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: 'submitBooking', payload: true})
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-api.cyclic.app/book/submit`,
        // url: `http://localhost:5000/book/submit`,
        data: dataBooking
      })
      dispatch({type: 'SET_LOADING', key: 'submitBooking', payload: false})
      cb()
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: 'submitBooking', payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function getAllBookings() {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: 'booking', payload: true})
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-api.cyclic.app/book?limit=10000`,
        // url: `http://localhost:5000/book/`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_BOOKINGS' })
    } catch (error) {
      alert(error.response.data.err || error.message)
    }
  }
}

export function getAllFixBookings() {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: 'fixBooking', payload: true})
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-api.cyclic.app/fixbook?limit=10000`,
        // url: `http://localhost:5000/book/`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_FIXBOOKINGS' })
    } catch (error) {
      alert(error.response.data.err || error.message)
    }
  }
}

export function updateFixBooking(dataForm, cb) {
  return async dispatch => {
    const _id = {...dataForm}._id
    try {
      dispatch({type: 'SET_LOADING', key: `updateFixBooking-${_id}`, payload: true})
      const payload = {...dataForm}
      delete payload._id
      delete payload.__v
      delete payload.createdAt
      delete payload.updatedAt
      delete payload.idx
      const { data } = await axios({
        method: 'put',
        url: `https://yogzan-api.cyclic.app/fixbook/${_id}`,
        // url: `http://localhost:5000/fixbook/${_id}`,
        data: payload,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      dispatch({type: 'SET_LOADING', key: `updateFixBooking-${_id}`, payload: false})
      cb()
      dispatch(getAllFixBookings())
    } catch(error) {
      dispatch({type: 'SET_LOADING', key: `updateFixBooking-${_id}`, payload: false})
    }
  }
}

export function deleteFixBooking(dataForm) {
  return async dispatch => {
    const _id = {...dataForm}._id
    try {
      dispatch({type: 'SET_LOADING', key: `deleteFixBooking-${_id}`, payload: true})
      const { data } = await axios({
        method: 'delete',
        url: `https://yogzan-api-dev.cyclic.app/fixbook/${_id}`,
        // url: `http://localhost:5000/fixbook/${_id}`,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      dispatch({type: 'SET_LOADING', key: `deleteFixBooking-${_id}`, payload: false})
      dispatch(getAllFixBookings())
    } catch(error) {
      dispatch({type: 'SET_LOADING', key: `deleteFixBooking-${_id}`, payload: false})
    }
  }
}

export function deleteGallery(id) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: `deleteGallery-${id}`, payload: true})
      const { data } = await axios({
        method: 'delete',
        url: `https://yogzan-api.cyclic.app/gallery/${id}`,
        // url: `http://localhost:5000/gallery/${id}`,
      })
      dispatch({type: 'SET_LOADING', key: `deleteGallery-${id}`, payload: false})
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: `deleteGallery-${id}`, payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function uploadHomepageGallery(file, imageName, index) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: `uploadHomepage-${index}`, payload: true})
      const convertedFile = base64toFile(file, imageName)
      const form = new FormData()
      form.append('name', imageName)
      form.append('horizontal', false)
      form.append('vertical', false)
      form.append('images', convertedFile)
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-api.cyclic.app/gallery/upload-homepage`,
        // url: `http://localhost:5000/gallery?id=${id}`,
        data: form,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      dispatch({type: 'SET_LOADING', key: `uploadHomepage-${index}`, payload: false})
      dispatch(getHomepageImages())
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: `uploadHomepage-${index}`, payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function getAllCategories() {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: 'category', payload: true})
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-api.cyclic.app/category`,
        // url: `http://localhost:5000/category`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_CATEGORY' })
    } catch (error) {
      alert(error.response.data.err || error.message)
    }
  }
}

export function addCategory(category, cb) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: 'addCategory', payload: true})
      const convertedFile = base64toFile(category.images, category.imageName)
      const form = new FormData()
      form.append('name', category.name)
      form.append('images', convertedFile)
      form.append('displayOnHomepage', category.displayOnHomepage ? true : false)
      form.append('displayOnGallery', category.displayOnGallery ? true : false)
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-api.cyclic.app/category`,
        // url: `http://localhost:5000/category`,
        data: form,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      dispatch({type: 'SET_LOADING', key: 'addCategory', payload: false})
      cb()
      dispatch(getAllCategories())
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: 'addCategory', payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function updateCategory(id, category, cb) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: `updateCategory-${id}`, payload: true})
      const form = new FormData()
      const isImageChanged = category.images?.includes('base64')
      if(isImageChanged) {
        const convertedFile = base64toFile(category.images, category.imageName)
        form.append('images', convertedFile)
      } else {
        form.append('image', category.images)
      }
      form.append('name', category.name)
      form.append('redirectLink', category.redirectLink)
      form.append('displayOnHomepage', category.displayOnHomepage ? true : false)
      form.append('displayOnGallery', category.displayOnGallery ? true : false)
      form.append('cities', JSON.stringify(category.cities || []))
      const { data } = await axios({
        method: 'put',
        url: `https://yogzan-api.cyclic.app/category/update/${id}`,
        // url: `http://localhost:5000/category/update/${id}`,
        data: form,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      dispatch({type: 'SET_LOADING', key: `updateCategory-${id}`, payload: false})
      cb()
      dispatch(getAllCategories())
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: `updateCategory-${id}`, payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function deleteCategory(id) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: `deleteCategory-${id}`, payload: true})
      const { data } = await axios({
        method: 'delete',
        url: `https://yogzan-api.cyclic.app/category/${id}`,
        // url: `http://localhost:5000/category/${id}`,
      })
      dispatch({type: 'SET_LOADING', key: `deleteCategory-${id}`, payload: false})
      dispatch(getAllCategories())
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: `deleteCategory-${id}`, payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function getAllTestimonies() {
  return async dispatch => {
    try {
      dispatch({type: 'SET_LOADING', key: 'testimony', payload: true})
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-api.cyclic.app/testimony`,
        // url: `http://localhost:5000/testimony`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_TESTIMONY' })
    } catch (error) {
      alert(error.response.data.err || error.message)
    }
  }
}

export function addTestimony(testimony, cb) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: 'addTestimony', payload: true})
      const convertedFile = base64toFile(testimony.images, testimony.imageName)
      const form = new FormData()
      form.append('name', testimony.name)
      form.append('images', convertedFile || '')
      form.append('link', testimony.link)
      form.append('desc', testimony.desc || '')
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-api.cyclic.app/testimony`,
        // url: `http://localhost:5000/testimony`,
        data: form,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      dispatch({type: 'SET_LOADING', key: 'addTestimony', payload: false})
      cb()
      dispatch(getAllTestimonies())
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: 'addTestimony', payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function updateTestimony(id, testimony, cb) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: `updateTestimony-${id}`, payload: true})
      const form = new FormData()
      const isImageChanged = testimony.images.includes('base64')
      if(isImageChanged) {
        const convertedFile = base64toFile(testimony.images, testimony.imageName)
        form.append('images', convertedFile)
      } else {
        form.append('image', testimony.images)
      }
      form.append('name', testimony.name)
      form.append('link', testimony.link)
      form.append('desc', testimony.desc)
      const { data } = await axios({
        method: 'put',
        url: `https://yogzan-api.cyclic.app/testimony/${id}`,
        // url: `http://localhost:5000/testimony/${id}`,
        data: form,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      dispatch({type: 'SET_LOADING', key: `updateTestimony-${id}`, payload: false})
      cb()
      dispatch(getAllTestimonies())
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: `updateTestimony-${id}`, payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function deleteTestimony(id) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: `deleteTestimony-${id}`, payload: true})
      const { data } = await axios({
        method: 'delete',
        url: `https://yogzan-api.cyclic.app/testimony/${id}`,
        // url: `http://localhost:5000/testimony/${id}`,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      dispatch({type: 'SET_LOADING', key: `deleteTestimony-${id}`, payload: false})
      dispatch(getAllTestimonies())
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: `deleteTestimony-${id}`, payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}

export function pathChecker(path, id) {
  return async (dispatch) => {
    try {
      dispatch({type: 'SET_LOADING', key: `checkPath-${id}`, payload: true})
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-api.cyclic.app/fixbook/check-path`,
        // url: `http://localhost:5000/testimony/${id}`,
        data: {
          path
        }
      })
      dispatch({type: 'SET_LOADING', key: `checkPath-${id}`, payload: false})
      dispatch({payload: {[id]: !data ? 'link sudah terpakai' : ''}, type: 'PATH_CHECKER'})
    } catch (error) {
      dispatch({type: 'SET_LOADING', key: `checkPath-${id}`, payload: false})
      alert(error.response.data.err || error.message)
    }
  }
}