import axios from 'axios'
import base64toFile from '../utils/base64ToFile'
import fileToBase64 from '../utils/fileTobase64'

export function getHomepageImages() {
  return async dispatch => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://yogzan-server-dev.herokuapp.com/gallery/homepage',
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_HOMEPAGE' })
    } catch (error) {
      
    }
  }
}

export function getPortfolioImages(category, city) {
  return async dispatch => {
    try {
      const url = (category && category !== 'Semua') ? 
        `https://yogzan-server-dev.herokuapp.com/gallery/category/${category}${city ? `?city=${city}` : ''}` :
        `https://yogzan-server-dev.herokuapp.com/gallery/${city ? `?city=${city}` : ''}`
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

export function getCities(category) {
  return async dispatch => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-server-dev.herokuapp.com/gallery/list-city`
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_CITY' })
    } catch (error) {
      
    }
  }
}

export function submitHiring(dataForm, cb) {
  return async () => {
    try {
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-server-dev.herokuapp.com/hiring/submit`,
        // url: `http://localhost:5000/hiring/submit`,
        data: dataForm
      })
      cb()
    } catch (error) {
      alert(error.message)
    }
  }
}

export function getAllHirings() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-server-dev.herokuapp.com/hiring?limit=1000`,
        // url: `http://localhost:5000/hiring/`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_HIRINGS' })
    } catch (error) {
      alert(error.message)
    }
  }
}

export function submitBooking(dataBooking, cb) {
  return async () => {
    try {
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-server-dev.herokuapp.com/book/submit`,
        // url: `http://localhost:5000/book/submit`,
        data: dataBooking
      })
      cb()
    } catch (error) {
      alert(error.message)
    }
  }
}

export function getAllBookings() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-server-dev.herokuapp.com/book?limit=1000`,
        // url: `http://localhost:5000/book/`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_BOOKINGS' })
    } catch (error) {
      alert(error.message)
    }
  }
}

export function deleteGallery(id) {
  return async () => {
    try {
      const { data } = await axios({
        method: 'delete',
        url: `https://yogzan-server-dev.herokuapp.com/gallery/${id}`,
        // url: `http://localhost:5000/gallery?id=${id}`,
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

export function uploadHomepageGallery(file, imageName) {
  return async (dispatch) => {
    try {
      const convertedFile = base64toFile(file, imageName)
      const form = new FormData()
      form.append('name', imageName)
      form.append('horizontal', false)
      form.append('vertical', false)
      form.append('images', convertedFile)
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-server-dev.herokuapp.com/gallery/upload-homepage`,
        // url: `http://localhost:5000/gallery?id=${id}`,
        data: form,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE4NWJjYTZlZTU2NjZmN2Q0NjBiMzEiLCJ1c2VybmFtZSI6Im1hc3RlciIsImVtYWlsIjoid2VibWFzdGVyejIwMjJAZ21haWwuY29tIiwiaWF0IjoxNjY2NDU2Mzc1fQ.ZzdHN98ZaR5RBO0gig-Yp2I8bli7-EwzAMhjjYA1Jcc'
        }
      })
      dispatch(getHomepageImages())
    } catch (error) {
      alert(error.message)
    }
  }
}

export function getAllCategories() {
  return async dispatch => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-server-dev.herokuapp.com/category`,
        // url: `http://localhost:5000/category`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_CATEGORY' })
    } catch (error) {
      alert(error.message)
    }
  }
}

export function addCategory(category, cb) {
  return async (dispatch) => {
    try {
      console.log(category)
      const convertedFile = base64toFile(category.images, category.imageName)
      const form = new FormData()
      form.append('name', category.name)
      form.append('images', convertedFile)
      form.append('displayOnHomepage', category.displayOnHomepage ? true : false)
      form.append('displayOnGallery', category.displayOnGallery ? true : false)
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-server-dev.herokuapp.com/category`,
        // url: `http://localhost:5000/category`,
        data: form,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE4NWJjYTZlZTU2NjZmN2Q0NjBiMzEiLCJ1c2VybmFtZSI6Im1hc3RlciIsImVtYWlsIjoid2VibWFzdGVyejIwMjJAZ21haWwuY29tIiwiaWF0IjoxNjY2NDU2Mzc1fQ.ZzdHN98ZaR5RBO0gig-Yp2I8bli7-EwzAMhjjYA1Jcc'
        }
      })
      cb()
      dispatch(getAllCategories())
    } catch (error) {
      alert(error.message)
    }
  }
}

export function updateCategory(id, category, cb) {
  return async (dispatch) => {
    try {
      const form = new FormData()
      const isImageChanged = category.images.includes('base64')
      if(isImageChanged) {
        const convertedFile = base64toFile(category.images, category.imageName)
        form.append('images', convertedFile)
      } else {
        form.append('image', category.images)
      }
      form.append('name', category.name)
      form.append('displayOnHomepage', category.displayOnHomepage ? true : false)
      form.append('displayOnGallery', category.displayOnGallery ? true : false)
      const { data } = await axios({
        method: 'put',
        url: `https://yogzan-server-dev.herokuapp.com/category/update/${id}`,
        // url: `http://localhost:5000/category/update/${id}`,
        data: form,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE4NWJjYTZlZTU2NjZmN2Q0NjBiMzEiLCJ1c2VybmFtZSI6Im1hc3RlciIsImVtYWlsIjoid2VibWFzdGVyejIwMjJAZ21haWwuY29tIiwiaWF0IjoxNjY2NDU2Mzc1fQ.ZzdHN98ZaR5RBO0gig-Yp2I8bli7-EwzAMhjjYA1Jcc'
        }
      })
      cb()
      dispatch(getAllCategories())
    } catch (error) {
      alert(error.message)
    }
  }
}

export function deleteCategory(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'delete',
        url: `https://yogzan-server-dev.herokuapp.com/category/${id}`,
        // url: `http://localhost:5000/category/${id}`,
      })
      dispatch(getAllCategories())
    } catch (error) {
      alert(error.message)
    }
  }
}

export function getAllTestimonies() {
  return async dispatch => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://yogzan-server-dev.herokuapp.com/testimony`,
        // url: `http://localhost:5000/testimony`,
      })
      dispatch({ payload: data, type: 'DATA_FETCHED_TESTIMONY' })
    } catch (error) {
      alert(error.message)
    }
  }
}

export function addTestimony(testimony, cb) {
  return async (dispatch) => {
    try {
      const convertedFile = base64toFile(testimony.images, testimony.imageName)
      const form = new FormData()
      form.append('name', testimony.name)
      form.append('images', convertedFile || '')
      form.append('link', testimony.link)
      form.append('desc', testimony.desc || '')
      const { data } = await axios({
        method: 'post',
        url: `https://yogzan-server-dev.herokuapp.com/testimony`,
        // url: `http://localhost:5000/testimony`,
        data: form,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE4NWJjYTZlZTU2NjZmN2Q0NjBiMzEiLCJ1c2VybmFtZSI6Im1hc3RlciIsImVtYWlsIjoid2VibWFzdGVyejIwMjJAZ21haWwuY29tIiwiaWF0IjoxNjY2NDU2Mzc1fQ.ZzdHN98ZaR5RBO0gig-Yp2I8bli7-EwzAMhjjYA1Jcc'
        }
      })
      cb()
      dispatch(getAllTestimonies())
    } catch (error) {
      alert(error.message)
    }
  }
}

export function updateTestimony(id, testimony, cb) {
  return async (dispatch) => {
    try {
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
        url: `https://yogzan-server-dev.herokuapp.com/testimony/${id}`,
        // url: `http://localhost:5000/testimony/${id}`,
        data: form,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE4NWJjYTZlZTU2NjZmN2Q0NjBiMzEiLCJ1c2VybmFtZSI6Im1hc3RlciIsImVtYWlsIjoid2VibWFzdGVyejIwMjJAZ21haWwuY29tIiwiaWF0IjoxNjY2NDU2Mzc1fQ.ZzdHN98ZaR5RBO0gig-Yp2I8bli7-EwzAMhjjYA1Jcc'
        }
      })
      cb()
      dispatch(getAllTestimonies())
    } catch (error) {
      alert(error.message)
    }
  }
}

export function deleteTestimony(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'delete',
        url: `https://yogzan-server-dev.herokuapp.com/testimony/${id}`,
        // url: `http://localhost:5000/testimony/${id}`,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE4NWJjYTZlZTU2NjZmN2Q0NjBiMzEiLCJ1c2VybmFtZSI6Im1hc3RlciIsImVtYWlsIjoid2VibWFzdGVyejIwMjJAZ21haWwuY29tIiwiaWF0IjoxNjY2NDU2Mzc1fQ.ZzdHN98ZaR5RBO0gig-Yp2I8bli7-EwzAMhjjYA1Jcc'
        }
      })
      dispatch(getAllTestimonies())
    } catch (error) {
      alert(error.message)
    }
  }
}