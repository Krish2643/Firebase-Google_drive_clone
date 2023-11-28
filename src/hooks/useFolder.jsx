import { useReducer, useEffect, useState } from "react";
import { firebaseAuth, firestore, useFirebase } from "../context/Firebase";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  or,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
};

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };


function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolder,
      };
      case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
}

export function useFolder(folderId = null, folder = null, file = null) {
  const firebase = useFirebase();
 let cuserId = ''
const currentUser = firebase.user
  console.log(currentUser,folderId);
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
    // console.log("first useEffect hook run");
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    async function readDocument() {
      const ref = doc(firestore, folder, folderId);
      const snap = await getDoc(ref);
      console.log(snap.data(), "this is from snap.data()");
      // console.log(snapshot.docs)
      if (snap.data()) {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: snap.data() },
        });
        cuserId = snap.data().userId
      } else {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      }
    }

    readDocument();
  }, [folderId]);

  useEffect(() => {
    const ref = collection(firestore, folder);
    const uId = currentUser && currentUser.uid
    const q1 = query(
      ref,
      where("parentId", "==", folderId), where("userId", "==", uId),
    );

    const unsub = onSnapshot(q1, (snapshot) => {
      console.log(snapshot.docs)
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: {
          childFolder: snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          }),
        },
      });
    });

    return ()=> unsub();
  }, [folderId,currentUser]);


   
  useEffect(() => {
    const ref = collection(firestore, file);
    const uId = currentUser && currentUser.uid
    const q1 = query(
      ref,
      where("folderId", "==", folderId), where("userId", "==", uId),
     // orderBy("createdAt")
    );

    const unsub = onSnapshot(q1, (snapshot) => {
      console.log(snapshot.docs)
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: {
          childFiles: snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          }),
        },
      });
    });

    return ()=> unsub();
  }, [folderId, currentUser]);


  return state;
}
