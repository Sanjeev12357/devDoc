import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'


export function BasicUsage({username}) {


    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <div className=''>
        
        <Avatar onClick={onOpen} name={username ? username :"Sanjeev"} src='https://bit.ly/tioluwani-kolawole' />
       
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="text-3xl mt-[30px] flex items-center justify-center">Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <div className='flex items-center justify-center mb-10'>
                <Avatar className="w-14 h-14" name={username ? username :"Sanjeev"} src='https://bit.ly/tioluwani-kolawole' />
            </div>
              <div className='font-bold text-2xl'>
              Username:{username ? username :"Sanjeev"}
              </div>
              <div className='font-bold text-2xl'>
                HeartRate:{Math.floor(Math.random() * (100 - 60 + 1)) + 60}
              </div>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>LogOut</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    )
  }