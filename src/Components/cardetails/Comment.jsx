import { useEffect, useState } from 'react';
import axios from 'axios';
import token from './token.js';

const Comment = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);
    const [editedText, setEditedText] = useState('');

    useEffect(() => {
        axios.get(`https://ash2521.pythonanywhere.com/cars/${id}/details/`, {
            headers: {
                'Authorization': `Bearer ${token}`
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
                    'Authorization': `Bearer ${token}`
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
        <div className="space-y-5 flex gap-3">
            {comments.length === 0 ? (
                <div>Комментариев пока нет...</div>
            ) : (
                comments.map((comment, index) => (
                    <div key={index} className="w-full border text-white p-4 rounded-lg mt-4">
                        <div className="flex items-start space-x-4">
                            <svg className="w-10 h-10 rounded-full bg-zinc-800" focusable="false"
                                 viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                            </svg>
                            <div className="flex-1">
                                <div className="flex justify-between items-center gap-8">
                                    <h4 className="text-lg font-bold">{comment.user || 'Unknown'}</h4>
                                    <p
                                        className="text-sm text-gray-400">{comment.created_at.slice(0, comment.created_at.indexOf("T"))}</p>
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