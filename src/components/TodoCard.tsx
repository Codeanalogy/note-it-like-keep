
import React, { useState } from 'react';
import { Check, Edit3, Trash2, MoreVertical, Calendar } from 'lucide-react';
import { Todo } from '../pages/Index';

interface TodoCardProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [showMenu, setShowMenu] = useState(false);

  const categoryColors = {
    personal: 'bg-green-100 border-green-200 text-green-800',
    work: 'bg-blue-100 border-blue-200 text-blue-800',
    urgent: 'bg-red-100 border-red-200 text-red-800'
  };

  const categoryDots = {
    personal: 'bg-green-400',
    work: 'bg-blue-400',
    urgent: 'bg-red-400'
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle.trim(),
        content: editContent.trim(),
        category: editCategory
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditContent(todo.content);
    setEditCategory(todo.category);
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
      todo.completed ? 'opacity-75 border-gray-200' : 'border-gray-100'
    } ${categoryColors[todo.category]}`}>
      {/* Card Header */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2 flex-1">
            <div className={`w-3 h-3 rounded-full ${categoryDots[todo.category]}`}></div>
            <span className="text-xs font-medium uppercase tracking-wide opacity-75">
              {todo.category}
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-black/5 rounded-full transition-colors"
            >
              <MoreVertical size={16} />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(todo.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Title and Content */}
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1"
              placeholder="Note title..."
              autoFocus
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full text-gray-700 bg-transparent resize-none focus:outline-none"
              placeholder="Take a note..."
              rows={3}
            />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value as Todo['category'])}
              className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 focus:outline-none"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        ) : (
          <div>
            <h3 className={`font-semibold text-gray-900 mb-2 ${todo.completed ? 'line-through' : ''}`}>
              {todo.title}
            </h3>
            {todo.content && (
              <p className={`text-gray-700 text-sm leading-relaxed ${todo.completed ? 'line-through' : ''}`}>
                {todo.content}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-4 pb-4">
        {isEditing ? (
          <div className="flex space-x-2 mt-3">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Calendar size={12} />
              <span>{formatDate(todo.updatedAt)}</span>
            </div>
            <button
              onClick={() => onToggleComplete(todo.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                todo.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              {todo.completed && <Check size={14} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
