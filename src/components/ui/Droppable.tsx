import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export default function Droppable({children, id}: {children: React.ReactNode, id: string}) {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div className='bg-secondary rounded-md p-2 flex flex-col' ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}