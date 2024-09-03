import { useEffect, useState } from 'react';
import axios from 'axios';

const Comment = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);
    const [editedText, setEditedText] = useState('');

    useEffect(() => {
        axios.get(`https://ash2521.pythonanywhere.com/cars/${id}/details/`, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MzU4NjM1LCJpYXQiOjE3MjUxODU4MzUsImp0aSI6ImM4YmM0Y2EyMjdjZjQyNWU4MWJiYTY5NDgzNzQyZWYwIiwidXNlcl9pZCI6Mn0.r49sPBGa7D7GfPt-Sfj9PpsPHzmMxZ8BBq6yNQu34v4`
            }
        })
            .then(response => {
                setComments(response.data.comments || []);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleEdit = (comment) => {
        setEditingComment(comment.id);
        setEditedText(comment.text);
    };

    const handleSave = () => {
        axios.patch(`https://ash2521.pythonanywhere.com/cars/${id}/details/`,
            { text: editedText },
            {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MzU4NjM1LCJpYXQiOjE3MjUxODU4MzUsImp0aSI6ImM4YmM0Y2EyMjdjZjQyNWU4MWJiYTY5NDgzNzQyZWYwIiwidXNlcl9pZCI6Mn0.r49sPBGa7D7GfPt-Sfj9PpsPHzmMxZ8BBq6yNQu34v4`
                }
            })
            .then(response => {
                setComments(prevComments =>
                    prevComments.map(comment =>
                        comment.id === editingComment ? { ...comment, text: editedText } : comment
                    )
                );
                setEditingComment(null);
                setEditedText('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="space-y-4">
            {comments.length === 0 ? (
                <div>Комментариев пока нет...</div>
            ) : (
                comments.map((comment, index) => (
                    <div key={index} className="w-full border text-white p-4 rounded-lg mt-4">
                        <div className="flex items-start space-x-4">
                            <img
                                src={comment.avatar || "https://via.placeholder.com/150"}
                                alt="avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-center gap-8">
                                    <h4 className="text-lg font-bold">{comment.user || 'Unknown'}</h4>
                                    <span className="text-sm text-gray-400">{comment.created_at.slice(0, comment.created_at.indexOf("T"))}</span>
                                    {editingComment === comment.id ? (
                                        <button onClick={handleSave} className="text-green-500">Сохранить</button>
                                    ) : (
                                        <button onClick={() => handleEdit(comment)} className="text-blue-500"><svg className="cursor-pointer p-1.5 h-[30px] w-[30px] opacity-80 hover:opacity-100" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill={"#ffffff"}><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></button>
                                    )}
                                </div>
                                {editingComment === comment.id ? (
                                    <textarea
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        className="mt-2 text-gray-300 text-lg w-full bg-gray-800 p-2 rounded-lg"
                                    />
                                ) : (
                                    <p className="mt-2 text-gray-300 text-lg">
                                        {comment.text || 'No comment text available'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Comment;
