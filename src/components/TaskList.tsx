import { useState } from 'react';
import '../styles/tasklist.scss'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { Notepad } from 'phosphor-react';
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');


  function handleCreateNewTask() {
    if (!newTaskTitle) return;
    setTasks([
      ...tasks,
      {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false,
      }
    ])
    setNewTaskTitle('');
  } 

  function handleToggleTaskCompletion(id: number) {
    const taskCompleted = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);
    setTasks(taskCompleted)
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <section className="task-list container">
      <header className='header-container'>
        <h2>Minhas tarefas</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>

        {tasks.length <= 0 && (
                  <section className="task-empty">
                    <div>
                    <p>Você ainda não tem tarefas cadastradas.</p>
                    <p>Crie tarefas e organize seu trabalho!</p>
                    <Notepad size={120}/>
                    </div>
                  </section>
                )}

          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />

                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
