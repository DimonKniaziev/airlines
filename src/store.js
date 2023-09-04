import { create } from "zustand";


const useTourFilter = create(set => ({
    searchTerm: '',
    countryFilter: '',
    starsFilter: [1, 2, 3, 4, 5],
    tourDurationFilter: '1',
    placesNeedFilter: '1',
    transportFilter: '',
    minPriceFilter: '',
    maxPriceFilter: '',
    
    setSearchTerm: (searchTerm) => set({searchTerm}),

    setCountryFilter: (countryFilter) => set({countryFilter}),
    setStartDateFilter: (startDateFilter) => set({startDateFilter}),
    setTourDurationFilter: (tourDurationFilter) => set({tourDurationFilter}),
    setStarsFilter: (starsFilter) => set({starsFilter}),
    setPlacesNeedFilter: (placesNeedFilter) => set({placesNeedFilter}),
    setTransportFilter: (transportFilter) => set({transportFilter}),
    setMinPriceFilter: (minPriceFilter) => set({minPriceFilter}),
    setMaxPriceFilter: (maxPriceFilter) => set({maxPriceFilter})    
}))

const useOrderFilter = create(set => ({
    periodFilter: 'all',
    sortingTerm: '',
    
    setPeriodFilter: (periodFilter) => set({periodFilter}),
    setSortingTerm: (sortingTerm) => set({sortingTerm})    
}))

const useReportCategory = create(set => ({
    reportPeriod: 'lastMonth',
    reportCategory: 'allOrders',
    
    setReportPeriod: (reportPeriod) => set({reportPeriod}),
    setReportCategory: (reportCategory) => set({reportCategory})    
}))

const useUsers = create(set=>({
    autorizedUser: {
        user_id: ''
    },
    autorizeUser: (autorizedUser) => set({autorizedUser})
}))

const useSearchHistory = create(set => ({
    lastPage: '/',    
    
    setLastPage: (lastPage) => set({lastPage})    
}))

export { useTourFilter, useOrderFilter, useReportCategory, useUsers, useSearchHistory};