import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';

const optimizeImage = () => {

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

    return //todo
}

export default optimizeImage;

const resizeImg = (file: any, size: any) => {
    return;
}

