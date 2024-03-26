import * as React from "react";
import { ContainerInput, ContainerList } from "./styles";
import { addTask, deleteTask, editTask, getTaskById, getTasks } from "../../services/task";
import toast from "react-hot-toast";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [task, setTask] = React.useState<string>('');
  const [taskToEdit, setTaskToEdit] = React.useState<string>('');
  
  React.useEffect(() => {
    returnTasks();
  }, [])
  
  const returnTasks = async () => {
    const tas = await getTasks();

    if (tas.statusCode != 200) {
      setErrorMessage(tas.message);
    }
    
    if(!tas.statusCode) {
      setTasks(tas);
    }
  }

  const handleDelete = async (taskId: string) => {
    const deleted = await deleteTask(taskId);

    if(deleted) {
      const newList = tasks.filter((item) => item.taskId !== taskId);
      if (newList.length <= 0) {
        setTasks([]);
        setErrorMessage('no tasks found');
      } else {
        setTasks(newList);
      }
    }
  }

  const handleTask = (event: any) => {
    setTask(event.target.value);
  }

  const handleSubmit = async () => {
    const tas = await addTask({
      title: task
    });
    
    if (!tas.statusCode) {
      tasks.unshift(tas);
      setTask('');
    }
  }

  const hadleFinish = async (taskId: string, finished: boolean) => {
    const data = {
      taskId,
      finished
    };

    const edit = await editTask(data);

    if (!edit.statusCode) {
      const newList = tasks.filter((item) => item.taskId !== taskId);
      
      newList.push(edit);

      setTasks(newList);
    }
  }

  const handleEdit = async (taskId: string) => {
    const data = {
      taskId,
      title: taskToEdit,
    };

    const edit = await editTask(data);

    if (!edit.statusCode) {
      const newList = tasks.filter((item) => item.taskId !== taskId);
      
      newList.push(edit);
      newList.sort((x, y) => (x === y) ? 0 : x ? 1 : -1);

      setTasks(newList);

      toast.success('Task edited successfully');
    }
  }

  const handleTaskToEdit = (event: any) => {
    setTaskToEdit(event.target.value);
  }

  const openModal = async (taskId: string) => {
    const taskGetted = await getTaskById(taskId);

    setTaskToEdit(taskGetted.title);

    document.getElementById('edit_modal').showModal();
  }

  return (
    <>
      <ContainerList>
        {tasks.length <= 0 ? (
          <p>{errorMessage}</p>
        ) : tasks.map((item) => (
          <div key={item.taskId}>
            <div className="form-control" style={{flexDirection: 'row', backgroundColor: '#EFEAE6', borderRadius: '10px', margin: '10px', width: '700px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {item.finished ? (
                <>
                  <label className="label cursor-pointer">
                    <input type="checkbox" defaultChecked disabled className="checkbox checkbox-primary" style={{ marginRight: '15px' }} />
                    <span className="label-text" style={{textDecoration: 'line-through'}}>{item.title}</span>
                  </label>
                  <button className="btn btn-xs btn-outline btn-info btn-disabled" style={{marginLeft: '10px', marginTop: '10px', marginRight: '5px', marginBottom: '10px'}}>Edit</button>
                  <button onClick={() => handleDelete(item.taskId)} className="btn btn-xs btn-outline btn-error" style={{marginLeft: '5px', marginTop: '10px', marginRight: '10px', marginBottom: '10px'}}>Delete</button>
                </>
              ):(
                <>
                  <label className="label cursor-pointer">
                    <input type="checkbox" onClick={() => hadleFinish(item.taskId, true)} className="checkbox checkbox-primary" style={{ marginRight: '15px' }} />
                    <span className="label-text">{item.title}</span>
                  </label>
                  <button 
                    className="btn btn-xs btn-outline btn-info" 
                    onClick={() => openModal(item.taskId)} 
                    style={{marginLeft: '10px', marginTop: '10px', marginRight: '5px', marginBottom: '10px'}}
                  >Edit</button>
                  <button onClick={() => handleDelete(item.taskId)} className="btn btn-xs btn-outline btn-error" style={{marginLeft: '5px', marginTop: '10px', marginRight: '10px', marginBottom: '10px'}}>Delete</button>
                </>
              )}
            </div>
            <dialog id="edit_modal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Task!</h3>
                <div className="modal-action" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <form method="dialog">
                    <div className="form-control" style={{flexDirection: 'row'}}>
                      <input type="text" onChange={handleTaskToEdit} value={taskToEdit} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" style={{backgroundColor: '#faf7f5'}} />
                      <button onClick={() => handleEdit(item.taskId)} className="btn btn-success" style={{marginLeft: '15px'}}>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))}
      </ContainerList>
      <ContainerInput>
        <div className="form-control" style={{flexDirection: 'row'}}>
          <input type="text" onChange={handleTask} value={task} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" style={{backgroundColor: '#faf7f5'}} />
          <button onClick={handleSubmit} className="btn btn-success" style={{marginLeft: '15px'}}>Save</button>
        </div>
      </ContainerInput>
    </>
  );
}

export default Tasks;