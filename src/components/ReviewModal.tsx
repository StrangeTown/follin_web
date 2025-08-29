import { X, ChevronUp, ChevronDown, Check } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Todo } from "../types/todo";

type Props = {
  open: boolean;
  onClose: () => void;
  todos: Todo[];
  title?: string;
};

export default function ReviewModal({ open, onClose, todos, title = "Review Todos" }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(todos.length > 0 ? 0 : null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Scroll active item into view
  const scrollToActiveItem = useCallback((index: number) => {
    const element = itemRefs.current[index];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, []);
  
  const navigateUp = useCallback(() => {
    if (todos.length === 0) return;
    let newIndex: number;
    if (activeIndex === null) {
      newIndex = 0;
    } else {
      newIndex = activeIndex > 0 ? activeIndex - 1 : todos.length - 1;
    }
    setActiveIndex(newIndex);
    scrollToActiveItem(newIndex);
  }, [activeIndex, todos.length, scrollToActiveItem]);

  const navigateDown = useCallback(() => {
    if (todos.length === 0) return;
    let newIndex: number;
    if (activeIndex === null) {
      newIndex = 0;
    } else {
      newIndex = activeIndex < todos.length - 1 ? activeIndex + 1 : 0;
    }
    setActiveIndex(newIndex);
    scrollToActiveItem(newIndex);
  }, [activeIndex, todos.length, scrollToActiveItem]);

  // Add keyboard event handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return;
      
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          navigateUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          navigateDown();
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, navigateUp, navigateDown, onClose]);

  // Reset refs array when todos change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, todos.length);
  }, [todos.length]);

  if (!open) return null;

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
    // Modal Background
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >

      {/* Modal Container */}
      <div 
        className="bg-white rounded-lg w-full h-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
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
              <p className="text-sm mt-2">还没有已完成的任务</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo, index) => (
                <div
                  key={todo.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
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
                      {todo.completed && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
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
