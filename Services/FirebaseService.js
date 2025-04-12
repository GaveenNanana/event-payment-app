import {
    collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebase_store, firebase_storage } from "./../firebaseConfig";

export const addDocument = async (collectionName, userData) => {
    try {
        const docRef = await addDoc(collection(firebase_store, collectionName), userData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document:", error);
    }
};

export const getCollection = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(firebase_store, collectionName));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return docs;
    } catch (error) {
        console.error("Error fetching docs:", error);
    }
};

export const getCollectionByUserID = async (collectionName, userID) => {
    try {
        const q = query(collection(firebase_store, collectionName), where('user_id', '==', userID));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
        return docs;
    } catch (error) {
        console.error('Error fetching docs:', error);
        return [];
    }
};

export const getCollectionByVendor = async (collectionName, vendorID) => {
    try {
        const q = query(collection(firebase_store, collectionName), where('vendor', '==', vendorID));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
        return docs;
    } catch (error) {
        console.error('Error fetching docs:', error);
        return [];
    }
};

export const getCollectionByCategory = async (collectionName, category) => {
    try {
        const q = query(collection(firebase_store, collectionName), where('businessCategory', '==', category));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
        return docs;
    } catch (error) {
        console.error('Error fetching docs:', error);
        return [];
    }
};

export const getDocument = async (collectionName, id) => {
    try {
        const docRef = doc(firebase_store, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

export const getUserByUserID = async (userID) => {
    try {
        const usersCollection = collection(firebase_store, "users");
        const q = query(usersCollection, where("userID", "==", userID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            userData.id = querySnapshot.docs[0].id;
            return userData;
        } else {
            console.log("No user found with this userID");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

export const geCustomerByUserID = async (userID) => {
    try {
        const usersCollection = collection(firebase_store, "Customers");
        const q = query(usersCollection, where("userID", "==", userID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            userData.id = querySnapshot.docs[0].id;
            return userData;
        } else {
            console.log("No user found with this userID");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

export const getVendorByName = async (vendor_name) => {
    try {
        const usersCollection = collection(firebase_store, "users");
        const q = query(usersCollection, where("businessName", "==", vendor_name));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            userData.id = querySnapshot.docs[0].id;
            return userData;
        } else {
            console.log("No vendor found with this userID");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

export const updateDocument = async (collectionName, id, newData) => {
    try {
        const docRef = doc(firebase_store, collectionName, id);
        await updateDoc(docRef, newData);
        console.log("Document updated");
    } catch (error) {
        console.error("Error updating document:", error);
    }
};

export const deleteUser = async (collectionName, id) => {
    try {
        await deleteDoc(doc(firebase_store, collectionName, id));
        console.log("Document deleted");
    } catch (error) {
        console.error("Error deleting document:", error);
    }
};


export const addImage = async (image, collectionName) => {
    try {
        console.log(image);
        if (!image || !image.uri) {
            throw new Error("No image provided");
        }

        const response = await fetch(image.uri);
        const blob = await response.blob();

        const filename = image.name || `image_${Date.now()}`;
        const storagePath = `${collectionName}/${filename}`;
        const storageRef = ref(firebase_storage, storagePath);

        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);

        return {
            success: true,
            url: downloadURL,
            name: filename,
            path: storagePath,
            size: blob.size,
            type: blob.type,
        };
    } catch (error) {
        console.error("Image upload failed", error);
        return {
            success: false,
            error: error.message,
        };
    }
};
