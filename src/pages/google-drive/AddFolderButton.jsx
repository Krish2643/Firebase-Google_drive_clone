import React, {useState} from 'react'
import {Button, Modal, Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { firestore, useFirebase } from '../../context/Firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { ROOT_FOLDER } from '../../hooks/useFolder';

const AddFolderButton = ({currentFolder}) => {
  const {folderId} = useParams()
     const firebase = useFirebase();
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    // const { currentUser } = useAuth()

    const openModal = ()=>{
       setOpen(true);
    }

    const closeModal = ()=>{
        setOpen(false);
    }

    const handleSubmit = (e)=>{
    e.preventDefault();
    // this current folder hold the information about its parent route

    
    if(currentFolder == null) {
      console.log("this is from Addfolderbutton and your currentFolder is null");
      return;
    }
    console.log(currentFolder, " this show the value of current folder");
    const path = [...currentFolder.path]
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: folderId })
    }

    console.log(path)

    console.log(firebase.user.uid, "this user id is from AddFolderButton");

    addDoc(collection(firestore, "folder"), {
         name: name,
         userId: firebase.user.uid,
         createdAt: new Date(),
         parentId: folderId ? folderId :null, 
         path: path,
        
    });
    

    setName("");
    closeModal( );
    }

  return (
    <>

       <Button onClick={openModal} variant="outline-success" size="sm">
       <FontAwesomeIcon icon={faFolderPlus} />
      </Button>

      <Modal show={open} onHide={closeModal}>
      <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </>
  )
}

export default AddFolderButton