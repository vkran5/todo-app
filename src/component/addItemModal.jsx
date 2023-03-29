import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react';
import { BsChevronDown } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import axios from 'axios';
import { useState } from 'react';

const AddItemModal = ({ isOpen, onClose, id, getDetail }) => {

    const [priority, setPriority] = useState('very-high');
    const [title, setTitle] = useState('')
   
    const addItem = async () => {
        try {
            let data = {
                activity_group_id: id,
                title,
                priority
            }

            console.log(data);

            let result = await axios.post("https://todo.api.devcode.gethired.id/todo-items", data);

            getDetail();
            setTitle('')
            setPriority('very-high')
            onClose();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <p className='font-poppins'>
                        Tambah List Items
                    </p>
                    <hr className='mt-5' />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p className='font-poppins text-[12px]'>NAMA LIST ITEM</p>
                    <Input
                        size='lg'
                        onChange={(e) => { setTitle(e.target.value) }}
                        placeholder='Tambahkan nama Activity'
                    />

                    <p className='font-poppins text-[12px] mt-5 mb-2'>PRIORITY</p>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                            Actions
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                <div className='flex' onClick={() => { setPriority('very-high') }}>
                                    <GoPrimitiveDot
                                        className={`text-[#ED4C5C] text-[32px] my-auto`}
                                    />
                                    <p className='font-poppins my-auto'>Very High</p>
                                </div>
                            </MenuItem>

                            <MenuItem>
                                <div className='flex' onClick={() => { setPriority('high') }}>
                                    <GoPrimitiveDot
                                        className={`text-[#F8A541] text-[32px] my-auto`}
                                    />
                                    <p className='font-poppins my-auto'>High</p>
                                </div>
                            </MenuItem>

                            <MenuItem>
                                <div className='flex' onClick={() => { setPriority('normal') }}>
                                    <GoPrimitiveDot
                                        className={`text-[#00A790] text-[32px] my-auto`}
                                    />
                                    <p className='font-poppins my-auto'>Medium</p>
                                </div>
                            </MenuItem>

                            <MenuItem>
                                <div className='flex' onClick={() => { setPriority('low') }}>
                                    <GoPrimitiveDot
                                        className={`text-[#428BC1] text-[32px] my-auto`}
                                    />
                                    <p className='font-poppins my-auto'>Low</p>
                                </div>
                            </MenuItem>

                            <MenuItem>
                                <div className='flex' onClick={() => { setPriority('very-low') }}>
                                    <GoPrimitiveDot
                                        className={`text-[#8942C1] text-[32px] my-auto`}
                                    />
                                    <p className='font-poppins my-auto'>Very Low</p>
                                </div>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </ModalBody>
                <hr className='my-2' />

                <ModalFooter className='flex'>
                    <button className='w-[150px] h-[54px] rounded-full bg-[#16ABF8] font-poppins text-white' disabled={!title ? true : false} onClick={() => {addItem()}}>
                        Simpan
                    </button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddItemModal;