import { create } from "zustand";


const useTours = create(    
    set => ({
        maxId: 100,
        tours: [
            {
                id: 1,
                label: "Ikaros Zakyntos",
                price: 19982,
                country: "Греція",
                city: "о. Закінф",
                transport: "Літак",
                stars: 2,
                image_id: 0
            },
            {
                id: 2,
                label: "Stavrolia Hotel",
                price: 20454,
                country: "Греція",
                city: "о. Закінф",
                transport: "Літак",
                stars: 2,
                image_id: 1
            },
            {
                id: 3,
                label: "Dimitra Hotel",
                price: 19982,
                country: "Греція",
                city: "о. Закінф",
                transport: "Літак",
                stars: 3,
                image_id: 2
            },
            {
                id: 4,
                label: "Ikaros Zakyntos",
                price: 19982,
                country: "Греція",
                city: "Халкідікі",
                transport: "Літак",
                stars: 3,
                image_id: 3
            },
            {
                id: 5,
                label: "Greek Hotel",
                price: 19982,
                country: "Греція",
                city: "Халкідікі",
                transport: "Літак",
                stars: 3,
                image_id: 4
            },
            {
                id: 6,
                label: "Dascalos Hotel",
                price: 19982,
                country: "Греція",
                city: "о. Корфу",
                transport: "Літак",
                stars: 3,
                image_id: 5
            },
            {
                id: 7,
                label: "Elena Studios",
                price: 19982,
                country: "Греція",
                city: "о. Лесбос",
                transport: "Літак",
                stars: 2,
                image_id: 6
            },
            {
                id: 8,
                label: "Irini Studios",
                price: 19982,
                country: "Греція",
                city: "о. Лесбос",
                transport: "Літак",
                stars: 2,
                image_id: 7
            },
            {
                id: 9,
                label: "Kassandra Hotel",
                price: 19982,
                country: "Греція",
                city: "о. Родос",
                transport: "Літак",
                stars: 3,
                image_id: 8
            },
            {
                id: 10,
                label: "Para`S Sun Hotel",
                price: 19982,
                country: "Греція",
                city: "Халкідікі",
                transport: "Літак",
                stars: 2,
                image_id: 9
            },
            {
                id: 11,
                label: "En Armonia Hotel",
                price: 19982,
                country: "Греція",
                city: "о. Закінф",
                transport: "Літак",
                stars: 2,
                image_id: 10
            },
            {
                id: 12,
                label: "Evans Hotel",
                price: 19982,
                country: "Греція",
                city: "о. Родос",
                transport: "Літак",
                stars: 3,
                image_id: 11
            },
        ],

        bookTour: (itemId) => set(state => {
            const idx = state.tours.findIndex((el) => el.id === itemId);
            const oldItem = state.tours[idx];
            const newItem = {...oldItem, freePlaces: oldItem.freePlaces-1, bookedPlaces: oldItem.bookedPlaces+1};
            
            return {tours: [...state.tours.slice(0, idx), newItem, ...state.tours.slice(idx+1)]};
        }),
    })
)

const useFilter = create(set => ({
    searchTerm: '',

    countryFilter: '',
    startDateFilter: '',
    tourDurationFilter: '1',    
    starsFilter1: true,
    starsFilter2: true,
    starsFilter3: true,
    starsFilter4: true,
    starsFilter5: true,
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

export {useTours, useFilter};