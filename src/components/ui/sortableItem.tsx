import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/16/solid';
import { UserCategoryDeletePopover } from './UserCategoryDeletePopover';
import { Bars4Icon, EllipsisHorizontalIcon } from '@heroicons/react/16/solid';

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
    <div className='flex items-center justify-between text-xs border-1 bg-secondary/50 active:bg-secondary px-2 py-1 rounded-md  active:shadow-md active:z-10' ref={setNodeRef} style={style} {...attributes} >
      {children}
      <div className='flex items-center'>
        <UserCategoryDeletePopover/>
        <EllipsisVerticalIcon className="h-4 w-4 text-muted-foreground cursor-grab active:cursor-grabbing" {...listeners}/>
      </div>

    </div>
  );
}