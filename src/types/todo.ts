export interface TodoTag {
  id: string
  name: string
  color: string
}

export interface Todo {
  id: string
  title: string
  completed: boolean
  completedAt?: Date
  createdAt?: Date
  tags?: TodoTag[]
  templateId?: string
  milestoneId?: string
}

// Represents a bucket of todos for a specific date.
// date is a string (ISO date) for easy serialization; todos is an array of todo ids.
export interface HistoryDate {
  date: string
  todoIds: string[]
}
