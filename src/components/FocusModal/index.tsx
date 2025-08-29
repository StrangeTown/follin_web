import { X, Check } from "lucide-react";
import { Todo } from "../../types/todo";

type Props = {
  open: boolean;
  onClose: () => void;
  todos: Todo[];
  title?: string;
};

export default function FocusModal({ open, onClose, todos, title = "Focus Session" }: Props) {
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
              <p className="text-lg">No todos for focus session</p>
              <p className="text-sm mt-2">Add some todos to start focusing</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    todo.completed
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      {todo.completed && (
                        <Check className="w-5 h-5 text-green-500" />
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
              <div>Total: {todos.length} todos</div>
              <div>Completed: {todos.filter(t => t.completed).length} / {todos.length}</div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Focus Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
