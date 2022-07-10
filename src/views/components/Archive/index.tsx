import React from "react";
import { Task } from "../../../data/stores/UseTodoStore";
import s from "./Archive.module.scss";
import { useState } from "react";
import { Button, Tabs } from "antd";
import { t } from "i18next";
import moment from "moment-timezone";

const { TabPane } = Tabs;

interface ArchiveProps {
  deletedTasks: Task[];
  doneTasks: Task[];
  removeArchiveDeletedTasks: () => void;
}
export const Archive = ({ deletedTasks, doneTasks }: ArchiveProps) => {
  return (
    <div className={s.archiveBlock}>
      <Tabs type="card">
        <TabPane className={s.tab} tab={`${t("deletedTasks")}`} key="1">
          {deletedTasks.map((item, key) => {
            return (
              <p className={s.archiveTask} key={key}>
                <span>{item.title}</span>
                <div>
                  <span className={s[item.priority]}>
                    {item.priority} priority
                  </span>
                  <span>
                    Deleted {moment(moment(item.createdTask).format()).fromNow()}
                  </span>
                </div>
              </p>
            );
          })}
        </TabPane>
        <TabPane className={s.tab} tab={`${t("doneTasks")}`} key="2">
          {doneTasks.map((item, key) => {
            return (
              <p className={s.archiveTask} key={key}>
                <span>{item.title}</span>
                <div>
                  <span className={s[item.priority]}>
                    {item.priority} priority
                  </span>
                  <span>
                    Done {moment(moment(item.createdTask).format()).fromNow()}
                  </span>
                </div>
              </p>
            );
          })}
        </TabPane>
      </Tabs>
      {/* { deletedTasks.length != 0 && <Button onClick={()=>removeArchiveDeletedTasks}>удалить архив</Button>} */}
    </div>
  );
};
