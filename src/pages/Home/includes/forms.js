import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tab, Tabs } from "react-bootstrap";
import FormsFileComponent from "./forms/file";
import FormsTextComponent from "./forms/text";
import FormsImageComponent from "./forms/image";

export default function FormsComponent({
  checkDeselect,
  stageWidth,
  stageHeight,
  setStageWidth,
  setStageHeight,
  stageRef,
  setFiles,
  files,
  selectedText,
  setSelectedText,
  texts,
  setTexts,
  selectedImageId,
  ImageOnSelect,
  textOnSelect,
  handleDeleteText,
  handleDeleteImage,
}) {
  const { setValue } = useForm();

  useEffect(() => {
    setValue("stage_width", stageWidth);
    setValue("stage_height", stageHeight);
  }, [setValue, stageHeight, stageWidth, setTexts]);

  return (
    <Fragment>
      <Tabs defaultActiveKey="image">
        <Tab eventKey="files" title="File" className="tab-container">
          <FormsFileComponent
            checkDeselect={checkDeselect}
            stageWidth={stageWidth}
            stageHeight={stageHeight}
            setStageWidth={setStageWidth}
            setStageHeight={setStageHeight}
            selectedText={selectedText}
            stageRef={stageRef}
          />
        </Tab>
        <Tab eventKey="text" title="Text" className="tab-container">
          <FormsTextComponent
            selectedText={selectedText}
            setSelectedText={setSelectedText}
            texts={texts}
            setTexts={setTexts}
            textOnSelect={textOnSelect}
            handleDeleteText={handleDeleteText}
          />
        </Tab>
        <Tab eventKey="image" title="Image" className="tab-container">
          <FormsImageComponent
            ImageOnSelect={ImageOnSelect}
            setFiles={setFiles}
            files={files}
            selectedImageId={selectedImageId}
            handleDeleteImage={handleDeleteImage}
          />
        </Tab>
      </Tabs>
    </Fragment>
  );
}
