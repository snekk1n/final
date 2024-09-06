import { useEffect, useState } from 'react';
import axios from 'axios';

const MainComment = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`https://ash2521.pythonanywhere.com/comments/`, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1NTUyNzA2LCJpYXQiOjE3MjUzNzk5MDYsImp0aSI6IjgzZGUyNmMzYzUzZjQzODY4MzE0NDhiYWIwMWFhOGZjIiwidXNlcl9pZCI6Mn0.Q_vEZ2-2lnjKbRui3EioLQs0_UTuiTa-uPsx7e5cbkc`
            }
        })
            .then(response => {
                setComments(response.data || []);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    if (comments.length === 0) {
        return <div>Комментариев пока нет...</div>;
    }

    return (
        <div className="space-y-4 flex gap-3">
            {comments.map((comment, index) => (
                <div key={index} className="w-full border text-white p-4 rounded-lg mt-4">
                    <div className="flex items-start space-x-4">
                        <svg className="w-10 h-10 rounded-full bg-zinc-800" focusable="false"
                                     viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                                </svg>
                        <div className="flex-1">
                            <div className="flex justify-between items-center gap-8">
                                <h4 className="text-lg font-bold">{comment.author.username || 'Unknown'}</h4>
                                <p className="text-sm text-gray-400">{comment.created_at.slice(0, comment.created_at.indexOf("T"))}</p>
                            </div>
                            <p className="mt-2 text-gray-300 text-lg">
                                {comment.text || 'No comment text available'}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MainComment;