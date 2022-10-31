const initialState = {
  homepageImages: [],
  portfolioImages: {
    meta: {},
    images: []
  },
  cities: [],
  categories: [],
  testimonials: [],
  hirings: {},
  bookings: {},
  fixBookings: {},
}

export default function reducer(state = initialState, action) {
  const { type } = action
  switch (type) {
    case 'DATA_FETCHED_HOMEPAGE':
      return {
        ...state,
        homepageImages: action.payload
      }
    case 'DATA_FETCHED_PORTFOLIO':
      return {
        ...state,
        portfolioImages: action.payload
      }
    case 'DATA_FETCHED_CITY':
      return {
        ...state,
        cities: action.payload
      }
    case 'DATA_FETCHED_CATEGORY':
      return {
        ...state,
        categories: action.payload
      }
    case 'DATA_FETCHED_TESTIMONY':
      return {
        ...state,
        testimonials: action.payload
      }
    case 'DATA_FETCHED_HIRINGS':
      return {
        ...state,
        hirings: action.payload
      }
    case 'DATA_FETCHED_BOOKINGS':
      return {
        ...state,
        bookings: action.payload
      }
    case 'DATA_FETCHED_FIXBOOKINGS':
      return {
        ...state,
        fixBookings: action.payload
      }
    default:
      return state
  }
}