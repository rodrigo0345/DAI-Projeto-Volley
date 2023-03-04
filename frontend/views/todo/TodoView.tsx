import { useEffect, useRef, useState } from 'react';
import type Todo from 'Frontend/generated/com/example/application/Todo';
import { TodoEndpoint } from 'Frontend/generated/endpoints';
import TodoModel from 'Frontend/generated/com/example/application/TodoModel';

async function addTask(task: string | undefined): Promise<Todo | undefined> {
  if (!task) {
    return undefined;
  }

  const aux: Todo = {
    task,
    done: false,
  };
  const savedTodo = await TodoEndpoint.save(aux);

  return savedTodo;
}

export default function TodoView() {
  const newTask = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    (async () => {
      const fetchTodos = await TodoEndpoint.findAll();
      setTodos(fetchTodos);
    })();
  }, []);

  return (
    <div className='flex flex-col h-full items-center justify-center p-l text-center box-border'>
      <div className='flex flex-col items-start font-bold m-m'>
        <label htmlFor='task'>Task</label>
        <div className='flex gap-s'>
          <input
            className='bg-gray-300 rounded-md outline-none p-2'
            ref={newTask}
            type='text'
            name='task'
            id='task-id'
          />
          <button
            className='dark:bg-indigo-800 text-gray-50 p-2 rounded-md hover:bg-indigo-600'
            onClick={async () => {
              const added = await addTask(newTask.current?.value);
              if (!added) return;
              setTodos((prev) => [...prev, added]);
            }}
          >
            Add task
          </button>
        </div>
      </div>
      {todos &&
        todos?.map((todo) => {
          return <div key={todo.id}>{todo.task}</div>;
        })}
      {todos?.length == 0 && <p>Nothing to see here...</p>}
    </div>
  );
}
