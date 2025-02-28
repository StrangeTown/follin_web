import React from 'react'

interface Command {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

interface SearchCommandResultsProps {
  commands: Command[]
}

function SearchCommandResults({ commands }: SearchCommandResultsProps) {
  if (commands.length === 0) {
    return null
  }

  return (
    <div className="mb-4">
      <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 px-2">Commands</h3>
      <ul className="space-y-1">
        {commands.map(command => (
          <li 
            key={command.id}
            onClick={command.action}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded">
              {command.icon}
            </div>
            <div>
              <div className="font-medium">{command.name}</div>
              <div className="text-xs text-gray-500">{command.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchCommandResults