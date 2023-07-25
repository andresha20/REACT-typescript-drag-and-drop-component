import './App.css'
import DragAndDrop from './components/drag-and-drop'
import Task from './components/task'

function App() {

  interface Task {
    title?: string,
    description?: string,
    date?: Date
  }

  const tasks: Task[] = [
    { title: "Task 1", description: 'Description for my first article.', date: new Date(Math.floor(Math.random() * Date.now())) },
    { title: "Task 2", description: 'Description for my second article.', date: new Date(Math.floor(Math.random() * Date.now())) },
    { title: "Task 3", description: 'Description for my third article.', date: new Date(Math.floor(Math.random() * Date.now())) },
    { title: "Task 4", description: 'Description for my fourth article.', date: new Date(Math.floor(Math.random() * Date.now())) },
    { title: "Task 5", description: 'Description for my fifth article.', date: new Date(Math.floor(Math.random() * Date.now())) },
  ]

  return (
    <>
      <h2>Drag the items upwards or downwards to rearrange them</h2>
      <DragAndDrop>
        {tasks.map(({ title, description, date }, i) => (
          <Task key={i} title={title} description={description} date={date} />
        ))}
      </DragAndDrop>
    </>
  )
}

export default App
