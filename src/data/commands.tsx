import React from 'react'
import { Plus, Import, CheckCircle2, Trash2 } from 'lucide-react'
import { Command } from '../types/command'
import { COMMAND_IDS } from '../constants/commandIds'

export const getCommands = (
  onCommandExecute: (commandId: string) => void
): Command[] => [
  {
    id: COMMAND_IDS.CREATE_TODO,
    name: 'Create Todo',
    description: 'Create a new todo item',
    icon: <Plus className="w-4 h-4" />,
    action: () => {
      onCommandExecute(COMMAND_IDS.CREATE_TODO);
    }
  },
  {
    id: COMMAND_IDS.IMPORT_FROM_TEMPLATE,
    name: 'Import from Template',
    description: 'Create todos from templates',
    icon: <Import className="w-4 h-4" />,
    action: () => {
      onCommandExecute(COMMAND_IDS.IMPORT_FROM_TEMPLATE);
    }
  },
  {
    id: COMMAND_IDS.COMPLETE_ALL,
    name: 'Complete All',
    description: 'Mark all todos as completed',
    icon: <CheckCircle2 className="w-4 h-4" />,
    action: () => {
      onCommandExecute(COMMAND_IDS.COMPLETE_ALL);
    }
  },
  {
    id: COMMAND_IDS.CLEAR_COMPLETED,
    name: 'Clear Completed',
    description: 'Remove all completed todos',
    icon: <Trash2 className="w-4 h-4" />,
    action: () => {
      onCommandExecute(COMMAND_IDS.CLEAR_COMPLETED);
    }
  }
];