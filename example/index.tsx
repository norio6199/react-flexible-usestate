import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStates } from '../.';

type Todo = {
  title: string;
  isDone: boolean;
};

type InitialValue = {
  newTodoTitle: string;
  todos: Todo[];
};

const initialValues: InitialValue = {
  newTodoTitle: '',
  todos: [
    {
      title: 'todo-a',
      isDone: false,
    },
    {
      title: 'todo-b',
      isDone: false,
    },
    {
      title: 'todo-c',
      isDone: false,
    },
    {
      title: 'todo-d',
      isDone: true,
    },
  ],
};

const App: React.VFC = () => {
  const [states, setStates] = useStates(initialValues);

  const todoList = React.useMemo(() => states.todos.filter(todo => !todo.isDone), [states.todos]);
  const doneList = React.useMemo(() => states.todos.filter(todo => todo.isDone), [states.todos]);

  const handleInputNewTodoTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setStates('newTodoTitle', event.target.value);
  };

  const handleAddNewTodo = (): void => {
    setStates(draft => {
      draft.todos.push({
        title: states.newTodoTitle,
        isDone: false,
      });
    });
    setStates('newTodoTitle');
  };

  const handleResetAll = (): void => {
    setStates();
  };

  const handleToggleTodoStatus = (title: string): void => {
    setStates(draft => {
      const target = draft.todos.find(todo => todo.title === title);
      if (target) {
        target.isDone = !target.isDone;
      }
    });
  };

  const handleRemoveTask = (title: string): void => {
    setStates(draft => {
      draft.todos = draft.todos.filter(todo => todo.title !== title);
    });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type='input' onChange={handleInputNewTodoTitle} value={states.newTodoTitle} />
        <button type='button' onClick={handleAddNewTodo}>
          add
        </button>
      </div>
      <button type='button' onClick={handleResetAll}>
        reset all
      </button>
      <h2>Todo</h2>
      <ul style={{ listStyle: 'none' }}>
        {todoList.map(todo => (
          <li key={todo.title} style={{ width: 'fit-content' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type='checkbox'
                onChange={(): void => handleToggleTodoStatus(todo.title)}
                checked={todo.isDone}
              />
              <p>{todo.title}</p>
              <button type='button' onClick={(): void => handleRemoveTask(todo.title)}>
                remove
              </button>
            </label>
          </li>
        ))}
      </ul>
      <h2>Done</h2>
      <ul style={{ listStyle: 'none' }}>
        {doneList.map(todo => (
          <li key={todo.title} style={{ width: 'fit-content' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type='checkbox'
                onChange={(): void => handleToggleTodoStatus(todo.title)}
                checked={todo.isDone}
              />
              <p>{todo.title}</p>
              <button type='button' onClick={(): void => handleRemoveTask(todo.title)}>
                remove
              </button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
