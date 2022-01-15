import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';

import Compressor from 'compressorjs';

const fileSizes: Array<number> = [1440, 400, 300, 200];

const compressImage = (file: File, size: number): Promise<File> => {
    return new Promise<File>((resolve, reject) => {
        new Compressor(file,
            {
                maxWidth: size,
                maxHeight: size,
                quality: 0.85,
                resize: 'cover',
                success: (result) => {
                    resolve(new File([result], file.name + '_' + size, {type: result.type}))
                },
                error: (error: Error) => reject(error)
        })
    });
}

async function optimizeImage(file: any) {

    const originalImg = file[0];

    // collect promises from the compression function
    const compressPromises: Promise<File>[] = [];

    for (const size of fileSizes) {
        compressPromises.push(compressImage(originalImg, size));
    }

    // wait until these properties are resolved and loop through the result
    Promise.all(compressPromises).then((compressedFiles) => {
        for (const file of compressedFiles) {
            // do whatever you need to do with these files - upload to server or whatever
            console.log('do whatever you need to do with these files - upload to server or whatever', file);

            uploadImageAsPromise(file);
        }
    }).catch((error) => console.log('ooops :(', error))
}

const storage = getStorage();
//Handle waiting to upload each file using promise
function uploadImageAsPromise (file: File) {
    return new Promise(function (resolve, reject) {

        const storageRef = ref(storage, `/t8/${file.name}-${getRandomInt(1000)}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

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

    });
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}



/*
const optimizeImage = async (file: any) => {

    const originalImg = file[0];

    Promise.all([
        new Compressor(file, {
            quality: 0.85,
            maxWidth: size,
            maxHeight: size,
            resize: 'cover',
            success: resolve,
            error: reject,
        })
    ])

    /*

    fileSizes.forEach((size) => {

        console.log(size);

        compress(originalImg, size).then(() => {
            console.log('image compressed');
        });

        //compress(originalImg, size);


    });


    // optimize

    // resize (multiple times for srcsets...

    // upload

    /*
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `/trips/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
        setUploadProgress(Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
    }, (error) => {
        console.error('An error happened during the upload', error.code);
        console.error('https://firebase.google.com/docs/storage/web/handle-errors');
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            setValue('imageUrl', downloadURL);
        })
    });

     */



export default optimizeImage;

const uploadImage = async (file: any) => {
    /*
    const storage = getStorage();

    //const storageRef = ref(storage, `/trips/${file.name}`);
    const storageRef = ref(storage, `/tests/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask.on('state_changed', (snapshot) => {
        //setUploadProgress(Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
    }, (error) => {
        console.error('An error happened during the upload', error.code);
        console.error('https://firebase.google.com/docs/storage/web/handle-errors');
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //setImageUrl(downloadURL);
            //setValue('imageUrl', downloadURL);
            return downloadURL;
        })
    });

     */

}

