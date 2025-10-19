import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { NewsPost } from '../../../types';
import Modal from '../../admin/Modal';
import { compressImage } from '../../admin/imageUtils';

const ManageNewsPage: React.FC = () => {
    const { newsPosts, updateNewsPosts } = useContent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<NewsPost | null>(null);

    const openModal = (post: NewsPost | null = null) => {
        setEditingPost(post);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPost(null);
    };

    const handleSave = (postData: NewsPost) => {
        let updatedPosts;
        if (editingPost) {
            updatedPosts = newsPosts.map(p => p.id === postData.id ? postData : p);
        } else {
            const newPost = { ...postData, id: Date.now() };
            updatedPosts = [...newsPosts, newPost];
        }
        updateNewsPosts(updatedPosts);
        closeModal();
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this news post?')) {
            updateNewsPosts(newsPosts.filter(p => p.id !== id));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage News</h1>
                <button onClick={() => openModal()} className="px-4 py-2 font-bold text-white bg-brand-teal rounded-md hover:bg-opacity-90">
                    Add New Post
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                            <th className="px-5 py-3">Title</th>
                            <th className="px-5 py-3">Date</th>
                            <th className="px-5 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsPosts.map(post => (
                            <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-5 py-4 text-sm">{post.title}</td>
                                <td className="px-5 py-4 text-sm">{post.date}</td>
                                <td className="px-5 py-4 text-sm">
                                    <button onClick={() => openModal(post)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <Modal onClose={closeModal} title={editingPost ? 'Edit News Post' : 'Add New Post'}>
                    <NewsForm post={editingPost} onSave={handleSave} onCancel={closeModal} />
                </Modal>
            )}
        </div>
    );
};

// Form Component
const NewsForm: React.FC<{ post: NewsPost | null; onSave: (post: NewsPost) => void; onCancel: () => void; }> = ({ post, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<NewsPost, 'id'>>({
        title: post?.title || '',
        date: post?.date || new Date().toISOString().split('T')[0],
        content: post?.content || '',
        imageUrl: post?.imageUrl || '',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const compressedDataUrl = await compressImage(file, { maxWidth: 1200 });
                setFormData(prev => ({ ...prev, imageUrl: compressedDataUrl }));
            } catch (error) {
                console.error("Image compression failed:", error);
                alert("There was an error processing the image. Please try another file.");
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: post?.id || 0 });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
            </div>
            <div>
                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Image (Optional)</label>
                 <input 
                    type="file" 
                    id="imageUpload" 
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageUpload} 
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-teal/10 file:text-brand-teal hover:file:bg-brand-teal/20 cursor-pointer" 
                />
                <p className="mt-1 text-xs text-gray-500">Recommended: Optimized images under 500KB for best performance.</p>
                 {formData.imageUrl && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700">Preview:</p>
                        <img src={formData.imageUrl} alt="Preview" className="mt-2 rounded-md border border-gray-200 h-40 object-cover" />
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                <textarea name="content" id="content" value={formData.content} onChange={handleChange} rows={8} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required></textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-teal text-white rounded-md hover:bg-opacity-90">Save</button>
            </div>
        </form>
    );
};

export default ManageNewsPage;