import React, {useState} from 'react'
import ReactDOM from "react-dom"
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFirebase, storage, firestore } from '../../context/Firebase'
import {getDownloadURL, ref, uploadBytes,} from 'firebase/storage'
import { collection, addDoc, doc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { useParams } from 'react-router-dom';
import {v4 as uuidV4} from 'uuid'
import { ProgressBar, Toast } from "react-bootstrap"

const AddFileButton = ({currentFolder}) => {
  const [uploadingFiles, setUploadingFiles] = useState([])
  const {folderId} = useParams()
    const currentUser = useFirebase();
    console.log(currentUser, "this is current User");
    console.log(folderId, "this is current folder");

     function handleUpload(e){
        console.log("uploading file");
        const file = e.target.files[0]
        if (currentFolder == null || file == null){
            console.log("this is from AddFileBut... And your file/currentFolder is empty");
            return;
        }

  
    const id = uuidV4()
   setUploadingFiles(prevUploadingFiles =>[
    ...prevUploadingFiles,{id :id, name: file.name, progress: 0, error: false }
   ])

    // console.log(currentFolder, "this is current folder");
    //  console.log(currentFolder.path, "this is current folder path");

       const filePath = currentFolder === ROOT_FOLDER ? `${currentFolder.path.join("/")}/${file.name}` : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`

       console.log(filePath, "this is file path");

      const uploadTask = ref(storage, `/files/${currentUser.user.uid}/${filePath}`);

       uploadBytes(uploadTask, file).then((snapshot)=>{
        console.log('Uploaded a blob or file!');
      })


      
      getDownloadURL(ref(storage, `/files/${currentUser.user.uid}/${filePath}`)).then((url)=>{


    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
           console.log(url, "this is the url");
           addDoc(collection(firestore, 'files'),{
           url: url,
          name: file.name,
          createdAt: new Date(),
          folderId: folderId ,
          userId: currentUser.user.uid,

           })
      }).catch((err)=>{
        console.log("hello");
        console.log(err)});
     
  

     }

  return (
    <>
    <label className="btn btn-outline-success btn-sm m-0 mr-2">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </label>
      </>
  )
}

export default AddFileButton