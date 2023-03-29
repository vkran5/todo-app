import React, { useEffect, useState } from "react";
import { SlPencil } from "react-icons/sl";
import { GoPrimitiveDot } from "react-icons/go";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";
import EditItemModal from "./EditItemModal";
import DeleteItemModal from "./DeleteItemModal";


const ListComponent = ({ item, getDetail}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isDeleteOpen, onOpen:onDeleteOpen, onClose:onCloseDelete } = useDisclosure();

    const checkBtn = async (id) => {
        try {

            let newStatus = 0;
            if (item.is_active === 0) {
                newStatus = 1;
            } else {
                newStatus = 0;
            }

            let result = await axios.patch("https://todo.api.devcode.gethired.id/todo-items/" + id, {
                is_active: newStatus
            });

            getDetail();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-[1000px] h-[80px] bg-white rounded-2xl shadow-lg flex justify-between mt-5">
            <div className="my-auto p-5 ml-3">
                <div className="flex gap-5">
                    <input
                        type="checkbox"
                        checked={item.is_active > 0 ? false : true}
                        className='w-[20px] h-[20px] my-auto'
                        onClick={() => { checkBtn(item.id) }}
                    />
                    <GoPrimitiveDot
                        className={`text-[32px] 
                        ${item.priority == 'very-high' && 'text-[#ED4C5C]'} 
                        ${item.priority == 'high' && 'text-[#F8A541]'} 
                        ${item.priority == 'normal' && 'text-[#00A790]'} 
                        ${item.priority == 'low' && 'text-[#428BC1] '} 
                        ${item.priority == 'very-low' && 'text-[#8942C1]'}`}
                    />
                    <p className={`font-poppins text-[18px] ${item.is_active < 1 && 'line-through text-[#888888]'}`}>{item.title}</p>
                    <SlPencil className="my-auto text-[#888888] text-[14px] cursor-pointer" onClick={onOpen}/>
                    <EditItemModal
                        isOpen={isOpen}
                        onClose={onClose}
                        getDetail={getDetail}
                        item={item}
                    />
                </div>
            </div>

            <div className="my-auto p-5">
                <BsTrash3 className="text-[24px] mr-3 font-bold text-[#888888] cursor-pointer" onClick={onDeleteOpen}/>
                <DeleteItemModal
                    isOpen={isDeleteOpen}
                    onClose={onCloseDelete}
                    getDetail={getDetail}
                    item={item}
                />
            </div>
        </div>

    )
};

export default ListComponent;