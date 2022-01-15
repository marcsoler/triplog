import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';

import Compressor from 'compressorjs';

interface IObjectKeys {
    [key: string]:  number;
}

export interface compressedFileType {
    file: File,
    variant: string,
}

const sizeGroup: IObjectKeys = {
    small: 340,
    medium: 450,
    large: 640,
    original: 0,
}



const storage = getStorage();

const compressImage = (file: File, size: number, sizeName: string): Promise<compressedFileType> => {
    return new Promise<compressedFileType>((resolve, reject) => {
        new Compressor(file,
            {
                maxWidth: size !== 0 ? size : undefined,
                maxHeight:  size !== 0 ? size : undefined,
                quality: 0.85,
                resize: 'cover',
                success: (result) => {
                    resolve({ file: new File([result], `${file.name}`, {type: result.type}), variant: sizeName});
                },
                error: (error: Error) => reject(error)
            })
    });
}

export async function optimizeImages(file: FileList, newFiles: (files: compressedFileType[]) => void) {

    const originalImg = file[0];

    const compressPromises: Promise<compressedFileType>[] = [];

    for (const property in sizeGroup) {
        compressPromises.push(compressImage(originalImg, sizeGroup[property], property));
    }
    // wait until these properties are resolved and loop through the result
    Promise.all(compressPromises).then((compressedFiles) => {
        newFiles(compressedFiles);
    }).catch((error) => console.log('ooops :(', error))
}


export async function uploadToStorage(file: File, variant: string, uploadedUrl: (link: string) => void) {
    return new Promise(function (resolve, reject) {

        const baseFileName = file.name.replace(/\.[^/.]+$/, '');


        const storageRef = ref(storage, `/t9/${baseFileName}/${baseFileName}_${variant}`);
        //const uploadTask = uploadBytesResumable(storageRef, file);

        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(storageRef).then((url) => {
                uploadedUrl(url);
            });

        });

        /*
        uploadTask.on('state_changed', (snapshot) => {
            //setUploadProgress(Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        }, (error) => {
            console.error('An error happened during the upload', error.code);
            console.error('https://firebase.google.com/docs/storage/web/handle-errors');
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                //setImageUrl(downloadURL);
                //setValue('imageUrl', downloadURL);
            })
        });

         */
    });
}
