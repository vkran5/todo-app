import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DeleteActivityModal from "./ModalDeleteActivity";

const Card = ({ task, getTaskList }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();


    return (
        <div data-cy='activity-title'  className="w-[235px] h-[234px] shadow-lg bg-white rounded-xl border flex flex-col justify-between cursor-pointer" >
            <p className="p-5 font-bold text-[18px] font-poppins" onClick={() => {navigate('/detail?task=' + task.id)}}>{task.title}</p>

            <div className="flex justify-between p-5">
                <p className="text-[16px] text-[#888888] font-poppins font-medium" >

                    {
                        new Date(task.created_at).toLocaleDateString("id-ID", {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })
                    }

                </p>
                <BsTrash3 className="text-[18px] font-bold text-[#888888] cursor-pointer" onClick={onOpen} />
                <DeleteActivityModal
                    isOpen={isOpen}
                    onClose={onClose}
                    task={task}
                    getTaskList={getTaskList}
                />
            </div>
        </div>
    )
}

export default Card;