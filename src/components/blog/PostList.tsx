import {useState} from 'react';

const PostList = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Title 1',
            body: 'Zetas unda in grandis brema!',
            created_at: '2021-10-18 12:00:00',
        },
        {
            id: 2,
            title: 'Title 2',
            body: 'Urbss accelerare! Aww, grace!',
            created_at: '2021-10-18 12:00:00',
        },
        {
            id: 3,
            title: 'Title 3',
            body: 'Lorem ipsum',
            created_at: '2021-10-18 12:00:00',
        },
    ]);

    return (
        <ul>
            {posts.map((post) => {
                return(<li key={post.id}>{post.title}</li>)
            })}
        </ul>
    )
}

export default PostList;
