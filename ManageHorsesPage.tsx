import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { Horse } from '../../../types';
import Modal from '../../admin/Modal';
import { compressImage } from '../../admin/imageUtils';

const ManageHorsesPage: React.FC = () => {
    const { horses, updateHorses } = useContent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHorse, setEditingHorse] = useState<Horse | null>(null);

    const openModal = (horse: Horse | null = null) => {
        setEditingHorse(horse);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingHorse(null);
    };

    const handleSave = (horseData: Horse) => {
        let updatedHorses;
        if (editingHorse) {
            updatedHorses = horses.map(h => h.id === horseData.id ? horseData : h);
        } else {
            const newHorse = { ...horseData, id: Date.now() };
            updatedHorses = [...horses, newHorse];
        }
        updateHorses(updatedHorses);
        closeModal();
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this horse?')) {
            updateHorses(horses.filter(h => h.id !== id));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Horses</h1>
                <button onClick={() => openModal()} className="px-4 py-2 font-bold text-white bg-brand-teal rounded-md hover:bg-opacity-90">
                    Add New Horse
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                            <th className="px-5 py-3">Name</th>
                            <th className="px-5 py-3">Bio</th>
                            <th className="px-5 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {horses.map(horse => (
                            <tr key={horse.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-5 py-4 text-sm">{horse.name}</td>
                                <td className="px-5 py-4 text-sm truncate max-w-sm">{horse.bio}</td>
                                <td className="px-5 py-4 text-sm">
                                    <button onClick={() => openModal(horse)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(horse.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <Modal onClose={closeModal} title={editingHorse ? 'Edit Horse' : 'Add New Horse'}>
                    <HorseForm horse={editingHorse} onSave={handleSave} onCancel={closeModal} />
                </Modal>
            )}
        </div>
    );
};

// Form Component
const HorseForm: React.FC<{ horse: Horse | null; onSave: (horse: Horse) => void; onCancel: () => void; }> = ({ horse, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Horse, 'id'>>({
        name: horse?.name || '',
        bio: horse?.bio || '',
        imageUrl: horse?.imageUrl || '',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const compressedDataUrl = await compressImage(file, { maxWidth: 800 });
                setFormData(prev => ({ ...prev, imageUrl: compressedDataUrl }));
            } catch (error) {
                console.error("Image compression failed:", error);
                alert("There was an error processing the image. Please try another file.");
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: horse?.id || 0 });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal" required />
            </div>
             <div>
                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Image</label>
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
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea name="bio" id="bio" value={formData.bio} onChange={handleChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal" required></textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-teal text-white rounded-md hover:bg-opacity-90">Save</button>
            </div>
        </form>
    );
};

export default ManageHorsesPage;