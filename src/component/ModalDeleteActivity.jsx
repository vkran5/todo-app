import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react'
import axios from 'axios';
import { CiWarning } from "react-icons/ci";

const DeleteActivityModal = ({ isOpen, onClose, task, getTaskList }) => {

    console.log(task);

    const deleteTask = async() => {
        try {
            let result = await axios.delete('https://todo.api.devcode.gethired.id/activity-groups/' + task.id);

            getTaskList();
            onClose();
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className='flex mt-5'>
                        <div className='mx-auto'>
                            <CiWarning className='text-[94px] text-red-500' />
                        </div>
                    </div>
                    <p className='mt-6 font-medium font-poppins text-center'> Apakah anda yakin menghapus list item <span className='font-bold font-poppins'>"{task.title}"</span></p>
                </ModalBody>

                <ModalFooter className='flex'>
                    <div className='flex mx-auto gap-4'>

                        <button className='w-[150px] h-[54px] rounded-full bg-slate-100 font-poppins' onClick={ onClose}>
                            Batal
                        </button>

                        <button className='w-[150px] h-[54px] rounded-full bg-red-500 font-poppins text-white' onClick={deleteTask }>
                            Hapus
                        </button>

                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteActivityModal;