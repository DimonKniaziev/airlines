import { dataBase, storage } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const getAllDataByName = async (dataName) => {
    try {
        const {docs} = await getDocs(collection(dataBase, dataName));

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

const addDataByName = async (dataName, newData) => {
    try {
        await addDoc(collection(dataBase, dataName), newData)
    } catch (error) {
        console.error(error)
    }
}

const getImage = async (imageId) => {
    const hotelImageRef = ref(storage, `hotel-images/hotel-image-${imageId}.png`);
    const image = await getDownloadURL(hotelImageRef);
    return image;
}

export { getAllDataByName, addDataByName, getImage };