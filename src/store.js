import { create } from "zustand";


const useTours = create(set => ({
        maxId: 10000,
        tours: [
            {
                id: 1,
                label: "Ikaros Zakyntos",
                price: 19982,
                country: "Греція",
                city: "о. Закінф",
                transport: "Літак",
                stars: 2,
                image_id: 0,
                description: "Ikaros Zakyntos - невеликий готель, розташований на західній околиці пляжу Анаксос. Підходить для спокійного економічного відпочинку."
            },
            {
                id: 2,
                label: "Stavrolia Hotel",
                price: 20454,
                country: "Греція",
                city: "о. Закінф",
                transport: "Літак",
                stars: 2,
                image_id: 1,
                description: "Готель розташований у мальовничому, тихому селі, у доглянутому саду, приблизно за 150 м від центру Аліканас (магазини, таверни, бари). Апарт-готель був повністю перебудований та відремонтований у 2010 році, клієнти можуть користуватися всією інфраструктурою комплексу. Доглянутий об'єкт складається із двох одноповерхових корпусів. Підійде до спокійного сімейного відпочинку."
            },
            {
                id: 3,
                label: "Zante Hotel",
                price: 19982,
                country: "Греція",
                city: "Халкідікі",
                transport: "Літак",
                stars: 3,
                image_id: 2,
                description: "Готель Oceanis розташований за 170 метрів від пляжу Калліфея. Готель відмінно підійде людям, які шукають бюджетний відпочинок."
            },
            {
                id: 4,                
                label: "Dimitra Hotel",
                price: 19982,
                country: "Греція",
                city: "о. Закінф",
                transport: "Літак",
                stars: 3,
                image_id: 3,
                description: "Апарт-готель розташований у селищі Коккіні Хані, неподалік пляжу. Поїздка від готелю до міста Херсонес з безліччю нічних закладів займе 15 хвилин. Готель був відкритий у 1981 році, остання реновація проводилася у 2016 році. Комплекс складається із двох 2-поверхових корпусів. Готель чудово підходить як для молодіжного, так і сімейного відпочинку."
            },
            {
                id: 5,
                label: "Greek Hotel",
                price: 19982,
                country: "Греція",
                city: "Халкідікі",
                transport: "Літак",
                stars: 3,
                image_id: 4,
                description: "Готель Greek з відкритим басейном розташований у місті Фурка. Відстань до найближчого пляжу становить 300 метрів."
            },
            {
                id: 6,
                label: "Dascalos Hotel",
                price: 19982,
                country: "Греція",
                city: "о. Корфу",
                transport: "Літак",
                stars: 3,
                image_id: 5,
                description: "Складається з одного триповерхового корпусу, обладнаного ліфтом. Побудований 1982 р. Остання реновація проводилася 2015 р. Гарний готель, розташований на узбережжі острова Крит. Готель відмінно підійде людям, які шукають бюджетний відпочинок."
            },
            {
                id: 7,
                label: "Elena Studios",
                price: 19982,
                country: "Греція",
                city: "о. Лесбос",
                transport: "Літак",
                stars: 2,
                image_id: 6,
                description: "Невеликий будинок, розташований в Анаксосі, тихе село на півночі Лесбосу. Поруч із студіями є ринок. До барів та таверн на пляжі – близько 150 м, найближчий ресторан – близько 30 м від об'єкту. До зупинки громадського транспорту, звідки можна дістатися великих туристичних центрів, таких як Петра або Молівос, приблизно 250 м. Підходить для молодіжного відпочинку."
            },
            {
                id: 8,
                label: "Irini Studios",
                price: 19982,
                country: "Греція",
                city: "о. Лесбос",
                transport: "Літак",
                stars: 2,
                image_id: 7,
                description: "Готель зручно розташований, дуже близько до центру Лаганаса, всього за 200 м від жвавої головної вулиці з безліччю барів, ресторанів та магазинів. Відмінне сполучення на місцевому транспорті (зупинка близько 200 м) або таксі з сусідніми містами, столиця острова Закінтос знаходиться всього в 8 км. Комплекс складається із 2 корпусів. "
            },
            {
                id: 9,
                label: "Kassandra Hotel",
                price: 19982,
                country: "Греція",
                city: "о. Родос",
                transport: "Літак",
                stars: 3,
                image_id: 8,
                description: "Сімейний апарт-готель Kassandra був збудований у 1989 році. Рік реставрації - 2012. Триповерховий готель розташований в місті Ялісос на Родос. Рекомендований для спокійного та сімейного відпочинку."
            },
            {
                id: 10,
                label: "Para`S Sun Hotel",
                price: 19982,
                country: "Греція",
                city: "Халкідікі",
                transport: "Літак",
                stars: 2,
                image_id: 9,
                description: "Студії Para'S Sun розташовані на курорті Яліссос у районі Тріанда. Готель відкритий у 2001 році, реставрований у 2015 році, загальна площа – 950 м2."
            },
            {
                id: 11,
                label: "En Armonia Hotel",
                price: 19982,
                country: "Греція",
                city: "о. Закінф",
                transport: "Літак",
                stars: 2,
                image_id: 10,
                description: "Готель En Armonia знаходиться всього за 250 м від пляжу Лаганаса, в оточенні оливкових гаїв. Готель являє собою 1-поверхову будівлю. Мальовничо розташований затишний готель із фантастичною атмосферою. Завдяки своєму розташуванню, це відмінна пропозиція для молодих людей, які люблять розваги та хочуть провести відпустку у місці, повному визначних пам'яток."
            },
            {
                id: 12,
                label: "Evans Hotel",
                price: 19982,
                country: "Греція",
                city: "о. Родос",
                transport: "Літак",
                stars: 3,
                image_id: 11,
                description: "Готель складається з 4 будівель, розташований в курортному селищі Фаліракі, за 1,5 км від пляжу (надається трансфер 1 раз на годину). Підходить для бюджетного сімейного відпочинку та молоді."
            },
        ]
}))

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

const useUsers = create(set=>({
    maxId: 1000,
    autorizedUser: {
        user_id: ''
    },
    users: [
        {
            id: 1,
            surname: 'Князєв',
            name: 'Дмитро',            
            patronymic: 'Ігорович',
            login: 'DimKniaz',
            email: 'dimkniazz@gmail.com',
            password: 'dimkniaz2002',
            phone: '0993579040',
            date: '2002-03-05',
            role: 'client'
        },
        {
            id: 2,
            surname: 'Анікіна',
            name: 'Александра',            
            patronymic: 'Генадіївна',
            login: 'PersikoveMorozyvo',
            email: 'dimkniazz@gmail.com',
            password: 'dimkniaz2002',
            phone: '0993579041',
            date: '2003-04-04',
            role: 'client'
        },
        {
            id: 3,
            surname: 'Гогін',
            name: 'Арсеній',            
            patronymic: 'Андрійович',
            login: 'GoginArs',
            email: 'dimkniazz@gmail.com',
            password: 'dimkniaz2002',
            phone: '0993579041',
            date: '2002-03-28',
            role: 'client'
        },
        {
            id: 4,
            surname: 'Admin',
            name: 'Admin',            
            patronymic: 'Admin',
            login: 'Admin',
            email: 'Admin@gmail.com',
            password: '12345678',
            phone: '0994589041',
            date: '2002-03-05',
            role: 'admin'
        }
    ],

    autorizeUser: (autorizedUser) => set({autorizedUser}),

    addUser: (newUser) => set(state => {
        if (newUser.id) {
            const idx = state.users.findIndex((el) => el.id === newUser.id);
            const oldItem = state.users[idx];
            const newItem = {...oldItem, ...newUser};
            return {users: [...state.users.slice(0, idx), newItem, ...state.users.slice(idx+1)]}
        }
        else {
            const user = {id: state.maxId, ...newUser,role: 'user'};
            return {users: [...state.users, user], maxId: state.maxId + 1, autorizedUser: {login: user.login, password: user.password, id: user.id}};
        }        
    })
}))

export {useTours, useFilter, useUsers};