import { firestore, storage } from "../firebase";
import { collection, getDocs, getDoc, addDoc } from "firebase/firestore";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

const getAllDataByName = async (dataName) => {
    try {
        const {docs} = await getDocs(collection(firestore, dataName));

        const data = (docs.map((doc) => {
            const id = doc.id;
            const docData = doc.data();
            return {id, ...docData};
        }))

        return data;
    } catch (error) {
        console.error(error)
    }
}

const addFirestoreDataByName = async (dataName, newData) => {
    try {
        await addDoc(collection(firestore, dataName), newData)
    } catch (error) {
        console.error(error)
    }
}

const getImage = async (imageId) => {
    const hotelImageRef = storageRef(storage, `hotel-images/hotel-image-${imageId}.png`);
    const image = await getDownloadURL(hotelImageRef);
    return image;
}

const getFirestoreData = async (dataQuery) => {
    try {
        const {docs} = await getDocs(dataQuery);

        const data = (docs.map((doc) => {
            const id = doc.id;
            const docData = doc.data();
            return {id, ...docData};
        }))

        return data;
    } catch (error) {
        console.error(error);
    }
}

const getFirestoreDatabyRef = async (dataRef) => {
    try {
        const doc = await getDoc(dataRef);
        const id = doc.id;
        const data = {id, ...doc.data()};

        return data;
    } catch (error) {
        console.error(error);
    }
}

export { getFirestoreDatabyRef, getAllDataByName, addFirestoreDataByName, getImage, getFirestoreData };