import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStorageProps } from './types';



const storeData = async ({ value, key }: LocalStorageProps) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
}

const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value
        }
    } catch (e) {
        // error reading value
    }
}

const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        // remove error
    }

    console.log('Done.')
}


export const useLocalStorage = () => {

    return { storeData, getData, removeData }
}