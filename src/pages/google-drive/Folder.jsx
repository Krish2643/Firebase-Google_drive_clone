import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"

export default function Folder({ folder }) {
  return (
    <Button
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      variant="outline-dark"
      className="text-truncate w-100 d-flex align-items-center"
      as={Link}
    >
      <FontAwesomeIcon icon={faFolder} className="mr-4" />
      <p className="mx-2 mb-0">{folder.name}</p>
    </Button>
  )
}