import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import s from "./Task.module.scss";
import { Select, Tooltip } from "antd";
import moment, { isMoment } from "moment-timezone";
// import 'moment/locale/en-gb'; // without this line it didn't work
// import 'moment/locale/ru'; // without this line it didn't work

const { Option } = Select;

type TaskProps = {
    id: string;
    title: string;
    createdTask: Date;
    key: number;
    priority: string;
    onDone: (id: string, title: string, priority: string) => void;
    onEdited: (id: string, title: string, priority: string) => void;
    onRemoved: (id: string, title: string, priority: string) => void;
    t: any;
};
export const Tasks = ({ id, title, createdTask, priority, key, onRemoved, onEdited, onDone, t }: TaskProps) => {
    // moment.locale('ru')
    const [value, setValue] = useState(title);
    const [editMode, setEditMode] = useState(false);
    const [taskPriority, setTaskPriority] = useState(priority);
    const editInputRef = useRef<HTMLInputElement>(null);
    const onDoneTimeOut = (id: string, title: string, priority: string) => {
        setTimeout(() => {
            onDone(id, title, priority);
        }, 400);
    };

    useEffect(() => {
        if (editMode) editInputRef?.current?.focus();
    }, [editMode]);
    const handleChange = (value: string) => {
        setTaskPriority(value);
    };
    
    return (
        <div className={s.tasksBlock} >
            <Tooltip style={{width: 'max-content'}} title={`Created ${moment(moment(createdTask).format()).fromNow()}`} arrowPointAtCenter>
            <div className={`${s.task} ${s[priority]}`} >
                <Checkbox
                    onClick={() => onDoneTimeOut(id, title, priority)}
                    disabled={editMode}
                />
                {editMode ? (
                    <>
                        <input
                            className={s.taskEditInput}
                            ref={editInputRef}
                            type="text"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onEdited(id, value, taskPriority);
                                    setEditMode(false);
                                }
                            }}
                        />
                        <Select defaultValue={`${t(priority)}`} style={{ width: 80 }} onChange={handleChange}>
                            <Option value={t('HighPriority')}>{t('HighPriority')}</Option>
                            <Option value={t('MediumPriority')}>{t('MediumPriority')}</Option>
                            <Option value={t('LowPriority')}>{t('LowPriority')}</Option>
                        </Select>
                    </>
                ) : (
                    <>
                        <h3>{title}</h3>
                    </>
                )}
                <div className={s.controls}>
                    {editMode ? (
                        <button
                            onClick={() => {
                                onEdited(id, value, taskPriority);
                                setEditMode(false);
                            }}
                        >
                            {t('save')}
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setEditMode(true);
                            }}
                        >
                            {t('edit')}
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (!editMode && confirm(`${t('confirmAlert')}`))
                                onRemoved(id, title, taskPriority);
                        }}
                        className={editMode ? s.controlsDeleteBtn : ""}
                    >
                        {t('delete')}
                    </button>
                </div>
            </div>
            {/* <SubTask /> */}
            </Tooltip>
        </div>
    );
};
