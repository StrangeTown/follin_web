import { ReactNode } from 'react'

export interface Command {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  action: () => void;
}