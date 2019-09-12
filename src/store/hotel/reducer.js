import * as types from "./actionTypes";
import moment from 'moment'

const initialState = {
  type: types.NONE,
  status: types.NONE,
  locationResults: [],
  selectedLocation: null,
  fromDate:new Date(),
  toDate:moment().add(1, 'days'),
  result:{},
  hotel:null,
  error: null,
  mapData:[],
  searchData:{},
  searchPageData:{
    "request": {
      "token": ""
    },
    "flags": {}
  },
  rooms:[{ adults: 2, children: [], infants: 0 }],
  recentSearches:[]
};

export default function common(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_LOCATIONS:
      return {
        ...state,
        type: types.GET_LOCATIONS,
        status: action.status,
        locationResults: action.result,
        error: action.error,
      }
    case types.SELECT_LOCATION:
      return {
        ...state,
        type: types.SELECT_LOCATION,
        status: action.status,
        selectedLocation: action.result,
        error: action.error,
      }
    case types.SELECT_DATE:
      return {
        ...state,
        type: types.SELECT_DATE,
        status: action.status,
        fromDate: action.result.fromDate,
        toDate: action.result.toDate,
        error: action.error,
      }
    case types.SELECT_ROOM:
      return {
        ...state,
        type: types.SELECT_ROOM,
        status: action.status,
        rooms: action.result,
        error: action.error,
      }
    case types.SEARCH_HOTEL:
      if(action.token) {
        state.searchPageData.request.token = action.token
      }
      if(action.result) {
        state.searchPageData.request.sortIndex = action.result.appliedSortingIndex
        state.searchPageData.request.filtersIndex = action.result.appliedFiltersIndex
        state.searchPageData.request.pageInfoIndex = action.result.pageInfoIndex
      }
      return {
        ...state,
        type: types.SEARCH_HOTEL,
        status: action.status,
        result: action.result,
        error: action.error,
      }
    case types.GET_HOTEL_DETAIL:
      return {
        ...state,
        type: types.GET_HOTEL_DETAIL,
        status: action.status,
        hotel: action.result,
        error: action.error,
      }
    case types.SET_SEARCH_DATA:
      return {
        ...state,
        type: types.SET_SEARCH_DATA,
        searchData: action.searchData
      }
    case types.SEARCH_HOTEL_PAGE:
      if(action.result) {
        state.searchPageData.request.sortIndex = action.result.appliedSortingIndex
        state.searchPageData.request.filtersIndex = action.result.appliedFiltersIndex
        state.searchPageData.request.pageInfoIndex = action.result.pageInfoIndex
      }
      return {
        ...state,
        type: types.SEARCH_HOTEL,
        status: action.status,
        result: action.result,
        error: action.error,
      }
    case types.SEARCH_HOTEL_PAGE_NEXT:
      if(action.result) {
        state.searchPageData.request.sortIndex = action.result.appliedSortingIndex
        state.searchPageData.request.filtersIndex = action.result.appliedFiltersIndex
        state.searchPageData.request.pageInfoIndex = action.result.pageInfoIndex
        if(state.result.data && state.result.data[0].item) {
          if(action.result.data && action.result.data[0].item) {
            state.result.data[0].item = state.result.data[0].item.concat(action.result.data[0].item)
          }
        }
      }
      return {
        ...state,
        type: types.SEARCH_HOTEL,
        status: action.status,
        result: state.result,
        error: action.error,
      }
    case types.SEARCH_MAP:
      return {
        ...state,
        type: types.SEARCH_MAP,
        status: action.status,
        mapData: action.result,
        error: action.error,
      }
    case types.RECENT_SEARCH:
      return {
        ...state,
        type: types.RECENT_SEARCH,
        status: action.status,
        recentSearches: action.result,
        error: action.error,
      }
    default:
      return state;
  }
}
