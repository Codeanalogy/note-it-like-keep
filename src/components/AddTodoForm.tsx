
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Todo } from '../pages/Index';

interface AddTodoFormProps {
  onAdd: (todo: Omit<Todo, 'id' | 'completed' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Todo['category']>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        content: content.trim(),
        category
      });
      setTitle('');
      setContent('');
      setCategory('personal');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const categoryColors = {
    personal: 'bg-green-100 border-green-200',
    work: 'bg-blue-100 border-blue-200',
    urgent: 'bg-red-100 border-red-200'
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-xl shadow-2xl w-full max-w-md border-2 ${categoryColors[category]} transform transition-all duration-200 scale-100`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">Create New Note</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6">
          <div className="space-y-4">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['personal', 'work', 'urgent'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      category === cat
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        cat === 'personal' ? 'bg-green-400' :
                        cat === 'work' ? 'bg-blue-400' : 'bg-red-400'
                      }`}></div>
                      <span className="capitalize">{cat}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter note title..."
                required
                autoFocus
              />
            </div>

            {/* Content Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Take a note..."
                rows={4}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              <Plus size={18} />
              <span>Create Note</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoForm;
