import React, { Fragment, useCallback, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { Wrapper } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropzone from "react-dropzone";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

export default function FormsImageComponent({
  ImageOnSelect,
  setFiles,
  files,
  selectedImageId,
  handleDeleteImage,
}) {
  const [isReorder, setIsReorder] = useState(false);
  const [oldOrder, setOldOrder] = useState(false);
  const onDropDp = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file, index) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            index: index,
            message: "",
          })
        )
      );
    },
    [setFiles]
  );

  const SortableItem = SortableElement(({ file, i }) => (
    <ListGroup.Item
      className={`container_content p-2 ${
        selectedImageId === file.index ? "active_list" : ""
      }`}
    >
      <img
        className="detail_image"
        src={file.preview}
        alt={`uploaded file ${file.index}`}
      />
    </ListGroup.Item>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem key={index} index={index} file={value} />
        ))}
      </div>
    );
  });

  const handleSortStart = ({ node }) => {
    const tds = document.getElementsByClassName("sortableHelper")[0].childNodes;
    node.childNodes.forEach(
      (node, idx) => (tds[idx].style.width = `${node.offsetWidth}px`)
    );
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setFiles(arrayMove(files, oldIndex, newIndex));
  };

  const handleReorderClick = () => {
    setIsReorder(!isReorder);
    setOldOrder(files);
  };

  const handleCancelReorder = () => {
    setIsReorder(!isReorder);
    setFiles(oldOrder);
  };

  return (
    <Fragment>
      <Wrapper>
        <Container className="p-0 mt-3">
          <Dropzone onDrop={onDropDp} accept="image/*">
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`uploader-container mb-2 ${isDragActive && "open"}`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div>Drop the files here ...</div>
                ) : (
                  <div>
                    {files ? (
                      <span>{files.length} files selected.</span>
                    ) : (
                      <span>
                        Drag 'n' drop some file here, or click to select file
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          <ListGroup className="previewContainer">
            <div className="text-right">
              <span
                className=" btn-sm btn btn-dark mb-1"
                onClick={handleReorderClick}
              >
                {isReorder ? "Save" : "Reorder"}
              </span>
              {isReorder ? (
                <span
                  className="ml-2 btn-sm btn btn-warning mb-1"
                  onClick={handleCancelReorder}
                >
                  Cancel
                </span>
              ) : (
                ""
              )}
            </div>

            {isReorder ? (
              files ? (
                <SortableList
                  helperClass="sortableHelper"
                  onSortStart={handleSortStart}
                  items={files}
                  onSortEnd={onSortEnd}
                />
              ) : (
                ""
              )
            ) : (
              files &&
              files.map((file, i) => {
                return (
                  <ListGroup.Item
                    key={file.index}
                    className={`container_content p-2 ${
                      selectedImageId === i ? "active_list" : ""
                    }`}
                  >
                    <span
                      className="delete-icon hand"
                      onClick={() => handleDeleteImage(file.index)}
                    >
                      <FontAwesomeIcon icon="times" />
                    </span>
                    <img
                      className="detail_image"
                      src={file.preview}
                      alt={`uploaded file ${file.index}`}
                      onClick={() => ImageOnSelect(file)}
                    />
                  </ListGroup.Item>
                );
              })
            )}
          </ListGroup>
        </Container>
      </Wrapper>
    </Fragment>
  );
}
