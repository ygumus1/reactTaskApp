import { useState, useContext } from "react";
import TaskCreate from "./TaskCreate";
import TasksContext from '../context/task';

function TaskShow({ task }) {
    const { editTaskById, deleteTaskById } = useContext(TasksContext);
    const [showEdit, setShowEdit] = useState(false);

    const handleDeleteClick = () => {
        deleteTaskById(task.id);
    };

    const handleEditClick = () => {
        setShowEdit(true);
    };

    const handleSubmit = (id, updatedTitle, updatedTaskDesc) => {
        setShowEdit(false);
        editTaskById(id, updatedTitle, updatedTaskDesc, task.completed);
    };

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        editTaskById(task.id, task.title, task.taskDesc, isChecked);
    };

    return (
        <div className="task-show">
            {showEdit ? (
                <TaskCreate task={task} taskformUpdate={true} onUpdate={handleSubmit} />
            ) : (
                <div>
                    <h3 className="task-title">Göreviniz</h3>
                    <p>{task.title}</p>
                    <h3 className="task-title">Yapılacaklar</h3>
                    <p>{task.taskDesc}</p>
                    <form method="post" className="task-checkbox">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={handleCheckboxChange}
                        />
                        <label>Yapıldı mı?</label>
                    </form>
                    <div>
                        <button className="task-delete" onClick={handleDeleteClick}>Sil</button>
                        <button className="task-edit" onClick={handleEditClick}>Güncelle</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskShow;
