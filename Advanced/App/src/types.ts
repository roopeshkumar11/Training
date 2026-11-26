import React from 'react';

export type Category = 
  | 'All'
  | 'Basics'
  | 'UI & Styling'
  | 'State & Hooks'
  | 'Lists & Scroll'
  | 'Networking'
  | 'Advanced';

export interface Topic {
  id: string;
  title: string;
  category: Exclude<Category, 'All'>;
  description: string;
  component: React.ComponentType;
  tags?: string[];
}
