import { X, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Todo } from "../types/todo";

type Props = {
  open: boolean;
  onClose: () => void;
  todos: Todo[];
  title?: string;
};

export default function ReviewModal({ open, onClose, todos, title = "Review Todos" }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(todos.length > 0 ? 0 : null);
  
  if (!open) return null;

  const navigateUp = () => {
    if (todos.length === 0) return;
    if (activeIndex === null) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex > 0 ? activeIndex - 1 : todos.length - 1);
    }
  };

  const navigateDown = () => {
    if (todos.length === 0) return;
    if (activeIndex === null) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex < todos.length - 1 ? activeIndex + 1 : 0);
    }
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return "";
    
    // Convert to Date object if it's a string
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) return "";
    
    return new Intl.DateTimeFormat('zh-CN', {
      month: 'numeric',
      day: 'numeric',
      weekday: 'short'
    }).format(dateObj);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full h-full max-w-none max-h-none m-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {todos.length === 0 ? (
            <div className="text-center text-gray-500 mt-12">
              <p className="text-lg">No todos to review</p>
              <p className="text-sm mt-2">Add some todos to see them here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo, index) => (
                <div
                  key={todo.id}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    activeIndex === index
                      ? "bg-blue-50 border-blue-300 shadow-md ring-2 ring-blue-100"
                      : todo.completed
                      ? "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      : "bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          todo.completed
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {todo.completed && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            todo.completed
                              ? "text-gray-500 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {todo.title}
                        </p>
                        {todo.scheduledDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Scheduled: {formatDate(todo.scheduledDate)}
                          </p>
                        )}
                        {todo.tags && todo.tags.length > 0 && (
                          <div className="flex space-x-1 mt-2">
                            {todo.tags.map((tag) => (
                              <span
                                key={tag.id}
                                className="px-2 py-1 text-xs rounded-full"
                                style={{
                                  backgroundColor: tag.color + "20",
                                  color: tag.color,
                                }}
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 ml-4">
                      {todo.createdAt && formatDate(todo.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <div>Total: {todos.length} todos</div>
              <div>Completed: {todos.filter(t => t.completed).length} / {todos.length}</div>
            </div>
            
            {todos.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 mr-2">
                  {activeIndex !== null ? `${activeIndex + 1} / ${todos.length}` : ''}
                </span>
                <button
                  onClick={navigateUp}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Previous todo (↑)"
                >
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={navigateDown}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Next todo (↓)"
                >
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
