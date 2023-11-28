import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import NavbarComponent from "./Navbar"
import AddFolderButton from "./AddFolderButton"
import { useFolder } from "../../hooks/useFolder"
import Folder from "./Folder"
import File from "./file"
import { useParams,useLocation } from "react-router-dom"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import AddFileButton from "./AddFileButton"

export default function Dashboard() {
    const {folderId} = useParams()
    const location = useLocation()
    console.log(location)
// 'wNCVYj3qMtCEFKteGYnK', 'folder'
// console.log(folderId)
   const {folder, childFolders, childFiles } = useFolder(folderId, 'folder', 'files');
    console.log(folder, "this line is from dashboard");
    console.log(childFolders, "this print childFolder");
    console.log(childFiles);     

  return (
    <>

      <NavbarComponent />
      <Container>
        <div className="d-flex justify-content-between align-items-center">
        <FolderBreadcrumbs  currentFolder= {folder}/>
        <AddFileButton currentFolder={folder}/>
        <AddFolderButton currentFolder={folder}/>
        </div>
       {/* { folder && <Folder folder={folder}/> } */}

       {childFolders?.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr /> }
         {childFiles?.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}

     

// <div className="d-flex align-items-center">
//           {/* <FolderBreadcrumbs currentFolder={folder} /> */}
//           {/* <AddFileButton currentFolder={folder} /> */}
//           {/* <AddFolderButton currentFolder={folder} /> */}
//           </div>
//           { {childFolders.length > 0 && (
//             <div className="d-flex flex-wrap">
//               {childFolders.map(childFolder => (
//                 <div
//                   key={childFolder.id}
//                   style={{ maxWidth: "250px" }}
//                   className="p-2"
//                 >
//                   <Folder folder={childFolder} />
//                 </div>
//               ))}
//             </div>
//           )}
//           {childFolders.length > 0 && childFiles.length > 0 && <hr />}
//           {childFiles.length > 0 && (
//             <div className="d-flex flex-wrap">
//               {childFiles.map(childFile => (
//                 <div
//                   key={childFile.id}
//                   style={{ maxWidth: "250px" }}
//                   className="p-2"
//                 >
//                   <File file={childFile} />
//                 </div>
//               ))} }
//             </div>
//             )}
            

