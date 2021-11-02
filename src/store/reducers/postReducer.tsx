const initialState = {
    posts: [
        {
            id: 1,
            title: 'Title 1',
            content: 'Zetas unda in grandis brema!',
            created_at: '2021-10-18 12:00:00',
        },
        {
            id: 2,
            title: 'Title 2',
            content: 'Urbss accelerare! Aww, grace!',
            created_at: '2021-10-18 12:00:00',
        },
        {
            id: 3,
            title: 'Title 3',
            content: 'Lorem ipsum',
            created_at: '2021-10-18 12:00:00',
        },
    ]
}

const postReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case 'CREATE_POST':
            console.log('created post', action.post);
            break;
    }

    return state;
}

export default postReducer;
