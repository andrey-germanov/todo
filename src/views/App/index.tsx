import React, { useEffect } from "react";
import s from "./index.module.scss";
import "antd/dist/antd.css";
import { useToDoStore } from "../../data/stores/UseTodoStore";
import { InputPlus } from "../components/InputPlus/InputPlus";
import { NotData } from "../components/NotData/NotData";
import { Tasks } from "../components/Task";
import { Archive } from "../components/Archive";
import { WithTranslation } from "react-i18next";
import { Button } from "antd";
import LoginButton from "../../Auth0/LoginButton";
import LogoutButton from "../../Auth0/LogoutButton";
import Profile from "../../Auth0/Profile";
import { useAuth0, User } from "@auth0/auth0-react";
import { TodoWork } from "../components/TodoWork/TodoWork";

export interface IAppProps extends WithTranslation {}

export const App = ({i18n, t} :IAppProps) => {
  const { isAuthenticated }: User = useAuth0();

  const setLanguage = (language: string) => {
    i18n.changeLanguage(language);
  }
  const [tasks, deletedTasks, doneTasks, createTask, updateTask, removeTask, doneTask, removeArchiveDeletedTasks] =
    useToDoStore((state) => [
      state.tasks,
      state.deletedTasks,
      state.doneTasks,
      state.createTask,
      state.updateTask,
      state.removeTask,
      state.doneTask,
      state.removeArchiveDeletedTasks,
    ]);
  return (
    <div className={s.todoWrapper}>
      <header>
        <Button onClick={() => setLanguage("en")}>ENGLISH</Button>
        <Button onClick={() => setLanguage("ru")}>ru</Button>
        <div >
          <Profile />
        </div>
          <LoginButton />
          <LogoutButton />
      </header>
      {
        isAuthenticated && 
        <>
          <TodoWork 
            tasks={tasks}
            deletedTasks={deletedTasks}
            doneTasks={doneTasks}
            createTask={createTask}
            updateTask={updateTask}
            removeTask={removeTask}
            doneTask={doneTask}
            removeArchiveDeletedTasks={removeArchiveDeletedTasks}
            t={t}
          />
        </>
      }
      
    </div>
  );
};
