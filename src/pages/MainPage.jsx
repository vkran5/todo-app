import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image_1 from '../assets/activity-empty-state.png'
import Card from "../component/Card";

const MainPages = () => {

    const [taskList, setTaskList] = useState([]);

    const getTaskList = async () => {
        try {
            const result = await axios.get('https://todo.api.devcode.gethired.id/activity-groups?email=vikriagung5@gmail.com');
            setTaskList(result.data.data)

        } catch (error) {
            console.log(error);
        }
    };

    const addNewTask = async() => {
        try {
            const addTask = await axios.post('https://todo.api.devcode.gethired.id/activity-groups?email=vikriagung5@gmail.com', {
                title: 'New Activity',
                email: 'vikriagung5@gmail.com',
                comment: 'Add new task'
            });

            console.log(addTask);

            getTaskList();
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTaskList();
    }, []);



    return (
        <div className="min-h-screen bg-slate-100 pt-[105px] pb-10">
            <div className="2xl:w-3/4 py-[42px] mx-auto flex justify-between">
                <p className="my-auto ml-[220px] text-[36px] font-bold font-poppins">Acivity</p>
                <button className="my-auto mr-[220px] rounded-full bg-[#16ABF8] h-[54px] w-[159px] text-white font-poppins font-bold" onClick={addNewTask}> + Tambah</button>
            </div>

            <div className="2xl:w-3/4 max-h-screen mx-auto">

                {
                    taskList.length === 0 ?
                        <img className="mx-auto" src={Image_1} alt="" />
                        :
                        <div className="mx-[220px] flex flex-wrap gap-5">
                            {
                                taskList.map((task, idx) => {

                                    console.log('dr loop:', task);
                                    return (
                                        <>
                                            <Card key={idx} task={task} getTaskList={getTaskList}/>

                                        </>
                                    )
                                })
                            }

                        </div>
                }

            </div>
        </div>
    )
}

export default MainPages;