export const createPost = (post: any) => {
    return (dispatch: any, getState: any) => {
        //make async call to db
        dispatch({type: 'CREATE_POST', post});
    }
}
