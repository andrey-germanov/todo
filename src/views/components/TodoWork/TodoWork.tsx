import React from 'react'
import { WithTranslation } from 'react-i18next';
import { Task } from '../../../data/stores/UseTodoStore';
import { Tasks } from '../Task/index';
import s from './TodoWork.module.scss';
import { InputPlus } from '../InputPlus/InputPlus';
import { NotData } from '../NotData/NotData';
import { Archive } from '../Archive/index';

interface TodoWorkProps {
    tasks: Task[],
    deletedTasks: Task[],
    doneTasks: Task[],
   
    createTask: (title: string, priority: string) => void;
    updateTask: (id: string, title: string, priority: string) => void;
    removeTask: (id: string, title: string, priority: string) => void;
    doneTask: (id: string, title: string, priority: string) => void;
    removeArchiveDeletedTasks: () => void;
    t: WithTranslation['t'],
}
export const TodoWork = ({tasks, deletedTasks, doneTasks, createTask, updateTask, removeTask, doneTask, removeArchiveDeletedTasks, t}: TodoWorkProps) => {
    const renderTaskByPriority = (priority: string) => {
        const task = tasks.map((item, key)=> {
          if (item.priority === `${priority}`){
            return (
                <Tasks
                  key={key}
                  id={item.id}
                  title={item.title}
                  createdTask={item.createdTask}
                  priority={item.priority}
                  onRemoved={removeTask}
                  onEdited={updateTask}
                  onDone={doneTask}
                  t={t}
                />
            )
          }
        })
        return task
      }
    return (
        <>
            <div className={s.todoWork}>
                <h1>{t("mainTitleBlock")}</h1>
                <InputPlus
                onAdd={(title: string, priority: string) => {
                    if (title) createTask(title, priority);
                }}
                t={t}
                />
                <hr />

                {renderTaskByPriority('High')}
                {renderTaskByPriority('Medium')}
                {renderTaskByPriority('Low')}

                {!tasks.length && <NotData />}
            </div>
            <div className={s.archiveWrapper}>
            <Archive
                deletedTasks={deletedTasks} 
                doneTasks={doneTasks}
                removeArchiveDeletedTasks={removeArchiveDeletedTasks}
            />
        </div>
        </>
    )
}
