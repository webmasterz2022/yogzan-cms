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
  pathChecker: true,
  isLoading: {}
}

export default function reducer(state = initialState, action) {
  const { type, key } = action
  switch (type) {
    case 'DATA_FETCHED_HOMEPAGE':
      return {
        ...state,
        homepageImages: action.payload,
        isLoading: {
          ...state.isLoading,
          homepage: false
        }
      }
    case 'DATA_FETCHED_PORTFOLIO':
      return {
        ...state,
        portfolioImages: action.payload,
        isLoading: {
          ...state.isLoading,
          portfolio: false
        }
      }
    case 'DATA_FETCHED_CITY':
      return {
        ...state,
        cities: action.payload,
        isLoading: {
          ...state.isLoading,
          city: false
        }
      }
    case 'DATA_FETCHED_CATEGORY':
      return {
        ...state,
        categories: action.payload,
        isLoading: {
          ...state.isLoading,
          category: false
        }
      }
    case 'DATA_FETCHED_TESTIMONY':
      return {
        ...state,
        testimonials: action.payload,
        isLoading: {
          ...state.isLoading,
          testimony: false
        }
      }
    case 'DATA_FETCHED_HIRINGS':
      return {
        ...state,
        hirings: action.payload,
        isLoading: {
          ...state.isLoading,
          hiring: false
        }
      }
    case 'DATA_FETCHED_BOOKINGS':
      return {
        ...state,
        bookings: action.payload,
        isLoading: {
          ...state.isLoading,
          booking: false
        }
      }
    case 'DATA_FETCHED_FIXBOOKINGS':
      return {
        ...state,
        fixBookings: action.payload,
        isLoading: {
          ...state.isLoading,
          fixBooking: false
        }
      }
    case 'PATH_CHECKER':
      return {
        ...state,
        pathChecker: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [key]: action.payload
        }
      }
    default:
      return state
  }
}