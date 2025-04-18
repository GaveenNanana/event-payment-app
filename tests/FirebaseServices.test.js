import {
    addDocument,
    getCollection,
    getCollectionByUserID,
    getCollectionByVendor,
    getCollectionByCategory,
    getDocument,
    getUserByUserID,
    geCustomerByUserID,
    getVendorByName,
    updateDocument,
    deleteUser,
    addImage,
} from '../Services/FirebaseService';

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


jest.mock('firebase/storage');
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    addDoc: jest.fn(),
    getFirestore: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
}));

describe('Firebase utility functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add a document and return its ID', async () => {
        const docRef = { id: 'abc123' };
        addDoc.mockResolvedValueOnce(docRef);
        const result = await addDocument('testCollection', { name: 'John' });
        expect(result).toBe('abc123');
    });

    it('should fetch all documents from a collection', async () => {
        const mockCollectionRef = {};
        collection.mockReturnValueOnce(mockCollectionRef);
        getDocs.mockResolvedValueOnce({
            docs: [
                { id: '1', data: () => ({ name: 'Alice' }) },
                { id: '2', data: () => ({ name: 'Bob' }) },
            ]
        });
        const result = await getCollection('testCollection');
        expect(result).toEqual([
            { id: '1', name: 'Alice' },
            { id: '2', name: 'Bob' },
        ]);
        expect(getDocs).toHaveBeenCalledWith(mockCollectionRef);
    });

    it('should return filtered docs by vendor', async () => {
        getDocs.mockResolvedValueOnce({
            docs: [{ id: '10', data: () => ({ vendor: 'vendor123', name: 'Vendor Item' }) }]
        });
        const result = await getCollectionByVendor('orders', 'vendor123');
        expect(result[0]).toHaveProperty('vendor', 'vendor123');
    });

    it('should return filtered docs by category', async () => {
        getDocs.mockResolvedValueOnce({
            docs: [{ id: '10', data: () => ({ businessCategory: 'Electronics', name: 'Laptop' }) }]
        });
        const result = await getCollectionByCategory('products', 'Electronics');
        expect(result[0]).toHaveProperty('businessCategory', 'Electronics');
    });

    it('should upload an image and return metadata', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({ blob: () => Promise.resolve({ size: 1234, type: 'image/jpeg' }) })
        );
        uploadBytes.mockResolvedValueOnce();
        getDownloadURL.mockResolvedValueOnce('https://mocked-url.com/image.jpg');

        const image = { uri: 'https://example.com/image.jpg', name: 'test.jpg' };
        const result = await addImage(image, 'photos');
        expect(result.success).toBe(true);
        expect(result.url).toContain('https://mocked-url.com');
        expect(uploadBytes).toHaveBeenCalledWith(undefined, { size: 1234, type: 'image/jpeg' });
    });

    it('should return an error when no image is provided in addImage', async () => {
        const result = await addImage(null, 'photos');
        expect(result.success).toBe(false);
        expect(result.error).toBe('No image provided');
    });

    it('should return null if user not found in getUserByUserID', async () => {
        getDocs.mockResolvedValueOnce({ empty: true, docs: [] });
        const result = await getUserByUserID('nonexistent');
        expect(result).toBeNull();
    });

    it('should return user data by userID in getUserByUserID', async () => {
        getDocs.mockResolvedValueOnce({
            docs: [
                { id: 'user123', data: () => ({ userID: 'user123', name: 'John' }) }
            ]
        });
        const result = await getUserByUserID('user123');
        expect(result).toEqual({ id: 'user123', userID: 'user123', name: 'John' });
    });

    it('should return null if customer not found in geCustomerByUserID', async () => {
        getDocs.mockResolvedValueOnce({ empty: true, docs: [] });
        const result = await geCustomerByUserID('nonexistent');
        expect(result).toBeNull();
    });

    it('should return customer data by userID in geCustomerByUserID', async () => {
        getDocs.mockResolvedValueOnce({
            docs: [
                { id: 'cust123', data: () => ({ userID: 'cust123', name: 'Jane' }) }
            ]
        });
        const result = await geCustomerByUserID('cust123');
        expect(result).toEqual({ id: 'cust123', userID: 'cust123', name: 'Jane' });
    });

    it('should return vendor by name', async () => {
        getDocs.mockResolvedValueOnce({
            docs: [
                { id: 'vendor123', data: () => ({ businessName: 'BestVendor', userID: 'vendor123' }) }
            ]
        });
        const result = await getVendorByName('BestVendor');
        expect(result).toEqual({ id: 'vendor123', businessName: 'BestVendor', userID: 'vendor123' });
    });

    it('should return null if vendor not found in getVendorByName', async () => {
        getDocs.mockResolvedValueOnce({ empty: true, docs: [] });
        const result = await getVendorByName('NonExistentVendor');
        expect(result).toBeNull();
    });
});
