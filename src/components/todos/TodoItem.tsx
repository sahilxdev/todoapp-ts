import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ArrowUpCircle, Check, Pencil } from 'lucide-react';
import { Todo } from './todoReducer';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (id: number, newTodo: string) => void;
  onRemove: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit, onRemove }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = useCallback(() => {
    if (editValue.trim() !== '') {
      onEdit(todo.id, editValue.trim());
      setIsEditing(false);
    } else {
      onRemove(todo.id);
    }
  }, [editValue, onEdit, onRemove, todo.id]);

  if (isEditing) {
    return (
      <div className="flex justify-between items-center w-72 mx-auto pt-4">
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          className="text-black py-1 px-2 w-full mr-2"
        />
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="rounded-full bg-green-500 hover:bg-green-600 h-8 w-8 flex items-center justify-center"
            aria-label="Confirm edit"
          >
            <Check className="w-[15px]" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="rounded-full bg-red-400 hover:bg-red-500 h-8 w-8 flex items-center justify-center"
            aria-label="Cancel edit"
          >
            X
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center w-72 mx-auto pt-4">
      <p className={`${todo.done ? "line-through text-red-300 text-[15px]" : ""} text-lg`}>
        {todo.todo}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="rounded-full bg-blue-500 hover:bg-blue-600 h-8 w-8 flex items-center justify-center"
          aria-label="Edit todo"
        >
          <Pencil className="w-[15px]" />
        </button>
        <button
          onClick={() => onRemove(todo.id)}
          className="rounded-full bg-red-500 hover:bg-red-600 h-8 w-8 flex items-center justify-center"
          aria-label="Remove todo"
        >
          X
        </button>
        <button
          onClick={() => onToggle(todo.id)}
          className="flex items-center justify-center text-[20px] rounded-full bg-violet-500 hover:bg-violet-600 h-8 w-8"
          aria-label={todo.done ? "Mark as undone" : "Mark as done"}
        >
          {todo.done ? <ArrowUpCircle /> : <Check />}
        </button>
      </div>
    </div>
  );
};

const MemoizedTodoItem = React.memo(TodoItem);
MemoizedTodoItem.displayName = 'TodoItem';

export default MemoizedTodoItem;
