import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { TeamMember } from '../../../types';
import Modal from '../../admin/Modal';
import { compressImage } from '../../admin/imageUtils';

const ManageTeamPage: React.FC = () => {
    const { teamMembers, updateTeamMembers } = useContent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

    const openModal = (member: TeamMember | null = null) => {
        setEditingMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMember(null);
    };

    const handleSave = (memberData: TeamMember) => {
        let updatedMembers;
        if (editingMember) {
            updatedMembers = teamMembers.map(m => m.id === memberData.id ? memberData : m);
        } else {
            const newMember = { ...memberData, id: Date.now() };
            updatedMembers = [...teamMembers, newMember];
        }
        updateTeamMembers(updatedMembers);
        closeModal();
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            updateTeamMembers(teamMembers.filter(m => m.id !== id));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Team</h1>
                <button onClick={() => openModal()} className="px-4 py-2 font-bold text-white bg-brand-teal rounded-md hover:bg-opacity-90">
                    Add New Member
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                            <th className="px-5 py-3">Name</th>
                            <th className="px-5 py-3">Role</th>
                            <th className="px-5 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembers.map(member => (
                            <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-5 py-4 text-sm">{member.name}</td>
                                <td className="px-5 py-4 text-sm">{member.role}</td>
                                <td className="px-5 py-4 text-sm">
                                    <button onClick={() => openModal(member)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <Modal onClose={closeModal} title={editingMember ? 'Edit Team Member' : 'Add New Member'}>
                    <TeamForm member={editingMember} onSave={handleSave} onCancel={closeModal} />
                </Modal>
            )}
        </div>
    );
};

// Form Component
const TeamForm: React.FC<{ member: TeamMember | null; onSave: (member: TeamMember) => void; onCancel: () => void; }> = ({ member, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>({
        name: member?.name || '',
        role: member?.role || '',
        bio: member?.bio || '',
        imageUrl: member?.imageUrl || '',
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
        onSave({ ...formData, id: member?.id || 0 });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
            </div>
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <input type="text" name="role" id="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
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
                        <img src={formData.imageUrl} alt="Preview" className="mt-2 rounded-md border border-gray-200 h-40 w-40 object-cover" />
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea name="bio" id="bio" value={formData.bio} onChange={handleChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required></textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-teal text-white rounded-md hover:bg-opacity-90">Save</button>
            </div>
        </form>
    );
};

export default ManageTeamPage;