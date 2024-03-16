import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import type { HeadFC, PageProps } from "gatsby"

import '../styles/global.css';
import { addTask, deleteTask, getTasks } from "../services/task";

const IndexPage: React.FC<PageProps> = () => {
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [task, setTask] = React.useState('');

  React.useEffect(() => {
    returnTasks();
  }, [])
  
  const returnTasks = async () => {
    const tas = await getTasks();

    if (tas.statusCode != 200) {
      setErrorMessage(tas.message);
    }
    
    if(!tas.statusCode) {
      tas.forEach((item: any) => {
        setTasks([...tasks, item]);
      });
    }
  }

  const handleDelete = async (taskId: string) => {
    const deleted = await deleteTask(taskId);

    if(deleted) {
      setTasks([]);
      returnTasks();
    }
  }

  const handleTask = (event: any) => {
    setTask(event.target.value)
  }

  const handleSubmit = async () => {
    const data = {
      title: task
    };

    const tas = await addTask(data);
    
    if(!tas.statusCode) {
      setTasks([...tasks, tas]);
    }
  }
  
  return (
    <main 
      data-theme="cupcake" 
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        backgroundColor: '#291334',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div 
        style={{
          width: '300px',
          height: '50px',
          display: 'flex',
          backgroundColor: '#FAF7F5',
          borderRadius: '10px',
          paddingLeft: '20px',
          paddingTop: '1px',
        }}
      >
        <StaticImage
          style={{
            height: '50px',
            width: '50px'
          }}
          alt="logo-app"
          src="../images/noun-planning-4894990.png"
        />
        <h1 
          className="text-3xl font-bold"
          style={{
            color: '#291334'
          }}
        >
          Task Manager
        </h1>
      </div>
      <div 
        style={{
          width: '300px',
          height: '50px',
          display: 'flex',
          backgroundColor: '#FAF7F5',
          borderRadius: '10px',
          paddingLeft: '25px',
          paddingTop: '5px',
          paddingBottom: '5px',
          marginTop: '5px',
          flexDirection: 'column',
        }}
      >
        {tasks.length <= 0 ? (
          <p>{errorMessage}</p>
        ) : tasks.map((task) => (
              <div key={task.taskId} className="form-control" style={{flexDirection: 'row'}}>
                <label className="label cursor-pointer">
                  {task.finished ? (
                    <>
                      <input type="checkbox" defaultChecked className="checkbox" style={{ marginRight: '15px' }} />
                      <span className="label-text">{task.title}</span> 
                    </>
                  ):(
                    <>
                      <input type="checkbox" className="checkbox" style={{ marginRight: '15px' }} />
                      <span className="label-text">{task.title}</span> 
                    </>
                  )}
                </label>
                <button className="btn btn-xs btn-outline btn-info">Edit</button>
                <button onClick={() => handleDelete(task.taskId)} className="btn btn-xs btn-outline btn-error">Delete</button>
              </div>
            ))}
      </div>
      <div 
        style={{
          width: '300px',
          height: '60px',
          display: 'flex',
          backgroundColor: '#FAF7F5',
          borderRadius: '10px',
          paddingLeft: '25px',
          paddingTop: '5px',
          paddingBottom: '5px',
          marginTop: '5px'
        }}
      >
        <div className="form-control" style={{flexDirection: 'row'}}>
          <input type="text" onChange={handleTask} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          <button onClick={handleSubmit} className="btn btn-xs btn-outline btn-success">Save</button>
        </div>
      </div>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
