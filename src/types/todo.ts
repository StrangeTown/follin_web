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

export interface Template {
  id: string
  title: string
  createdAt: Date
  tags?: TodoTag[]
  milestoneId?: string
}