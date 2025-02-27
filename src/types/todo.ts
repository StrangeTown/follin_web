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
  tags?: TodoTag[]
}

export interface Template {
  id: string
  title: string
  createdAt: Date
  tags?: TodoTag[]
}