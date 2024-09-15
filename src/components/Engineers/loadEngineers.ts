import type { StorageData, Engineer } from "./model";

export class StorageError extends Error {}

export const loadEngineers = () => {
    const storageData = localStorage.getItem('ReqData');
    if (storageData) {
        const parsedData: StorageData = JSON.parse(storageData);
        console.log(parsedData);
        if (parsedData.length > 0) {
            return parsedData;
        }
        console.log({ parsedData })
        throw new StorageError('No engineers data found')
    } else {
        throw new StorageError('ReqData was not found in local')
    }
};