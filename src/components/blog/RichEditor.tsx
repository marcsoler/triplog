import {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichEditor: FC = () => {

    const {control} = useForm();

    //     return <ReactQuill theme="snow" value={content} onChange={setContent} />

    return <Controller name="RichEditor" control={control} render={({field}) => <ReactQuill {...field} />}/>
}

export default RichEditor;
