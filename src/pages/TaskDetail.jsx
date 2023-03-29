import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { SlPencil } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router-dom";
import Image_1 from '../assets/todo-empty-state.png'
import ListComponent from "../component/ListComponent";
import { useDisclosure } from "@chakra-ui/react";
import AddItemModal from "../component/addItemModal";

const TaskDetailPage = () => {

    const [itemList, setItemList] = useState([]);
    // const [idList, setIdList] = useState(null);
    const [title, setTitle] = useState('');
    const [isTitleEditable, setIsTitleEditable] = useState(false);

    const navigate = useNavigate();
    const { search } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const inputRef = useRef(null);

    const getDetail = async () => {
        try {
            const res = await axios.get('https://todo.api.devcode.gethired.id/todo-items?activity_group_id=' + search.split('=')[1])
            setItemList(res.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isTitleEditable) {
            inputRef.current.focus();
        }
    }, [isTitleEditable]);

    
    const getTitle = async() => {
        try {
            const result = await axios.get('https://todo.api.devcode.gethired.id/activity-groups/' + search.split('=')[1]);
            setTitle(result.data.title)
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDetail();
        getTitle()
    }, []);

    const editTitle = async () => {
        try {
            if (!isTitleEditable) {
                setIsTitleEditable(true);
            } else {
                const result = await axios.patch("https://todo.api.devcode.gethired.id/activity-groups/" + search.split('=')[1], { title: title });

                setIsTitleEditable(false);
                getDetail();

            }

        } catch (error) {

        }
    };


    return (
        <div className="min-h-screen bg-slate-100 pt-[105px] pb-5">
            <div className="2xl:w-3/4 py-[42px] mx-auto flex justify-between">
                <div className="my-auto mx-[220px] flex">
                    <MdKeyboardArrowLeft className="text-[42px] my-auto" onClick={() => navigate('/')} />
                    {!isTitleEditable ?
                        <p className="text-[36px] font-bold font-poppins my-auto ml-5">{title}</p>
                        :
                        <input
                            type='text'
                            className="appearance-none bg-transparent border-b-2  w-full text-[36px] font-bold font-poppins my-auto focus:outline-none"
                            defaultValue={title}
                            onChange={(e) => setTitle(e.target.value)}
                            ref={inputRef}
                        />}
                    <SlPencil className="text-[18px] ml-[24px] text-[#A4A4A4] my-auto cursor-pointer" onClick={editTitle} />
                </div>

                <button className="my-auto mr-[220px] rounded-full bg-[#16ABF8] h-[54px] w-[159px] text-white font-poppins font-bold" onClick={onOpen}>
                    + Tambah
                </button>

                <AddItemModal
                    isOpen={isOpen}
                    onClose={onClose}
                    getDetail={getDetail}
                    id={search.split('=')[1]}
                />
            </div>

            <div className="2xl:w-3/4 max-h-screen mx-auto">

                {
                    itemList.length === 0 ?
                        <img className="mx-auto" src={Image_1} alt="" />
                        :
                        <div className="mx-auto">
                            <div className="mx-[220px]">
                                {
                                    itemList.map((item, idx) => {
                                        return (
                                            <ListComponent key={idx} item={item} getDetail={getDetail} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default TaskDetailPage;