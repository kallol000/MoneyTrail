import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export default function SortableItem({id, children}: {id: string | number; children: React.ReactNode}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div className='text-xs border-1 bg-secondary/50 active:bg-secondary px-2 py-1 rounded-md cursor-grab active:cursor-grabbing active:shadow-md active:z-10' ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}