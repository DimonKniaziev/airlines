import { create } from "zustand";


const useTourFilter = create(set => ({
    searchTerm: '',
    countryFilter: '',  
    starsFilter1: true,
    starsFilter2: true,
    starsFilter3: true,
    starsFilter4: true,
    starsFilter5: true,
    tourDurationFilter: '1',
    placesNeedFilter: '1',
    transportFilter: '',
    minPriceFilter: '',
    maxPriceFilter: '',
    
    setSearchTerm: (searchTerm) => set({searchTerm}),

    setCountryFilter: (countryFilter) => set({countryFilter}),
    setStartDateFilter: (startDateFilter) => set({startDateFilter}),
    setTourDurationFilter: (tourDurationFilter) => set({tourDurationFilter}),
    setStarsFilter1: (starsFilter1) => set({starsFilter1}),
    setStarsFilter2: (starsFilter2) => set({starsFilter2}),
    setStarsFilter3: (starsFilter3) => set({starsFilter3}),
    setStarsFilter4: (starsFilter4) => set({starsFilter4}),
    setStarsFilter5: (starsFilter5) => set({starsFilter5}),
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