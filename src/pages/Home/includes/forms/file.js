import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";

export default function FormsFileComponent({
  checkDeselect,
  stageWidth,
  stageHeight,
  setStageWidth,
  setStageHeight,
  selectedText,
  stageRef,
}) {
  const [stageName, setStageName] = useState("");
  const { register, setValue } = useForm();
  const options = [
    {
      value: "png",
      label: "Png",
    },
    {
      value: "jpeg",
      label: "Jpeg",
    },
  ];
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    if (selectedText) {
      setValue("text_content", selectedText.text);
    } else {
      setValue("text_content", "");
    }
  }, [selectedText, setValue]);

  useEffect(() => {
    setValue("stage_width", stageWidth);
    setValue("stage_height", stageHeight);
  }, [setValue, stageHeight, stageWidth]);

  const updateStageWidth = (e) => {
    const value = e.target.value;
    setStageWidth(value);
  };

  const updateStageHeight = (e) => {
    const value = e.target.value;
    setStageHeight(value);
  };

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const downloadURI = (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadImage = () => {
    checkDeselect(stageRef, true);
    setTimeout(() => {
      const fileName = stageName || "image";
      const ext = selectedOption.value || "png";
      const dataURL = stageRef.current.toDataURL({
        mimeType: "image/" + ext,
        quality: 0,
        pixelRatio: 2,
      });
      downloadURI(dataURL, fileName);
    });
  };
  return (
    <Fragment>
      <Row className="border-bot-dotted">
        <Col className="p-0 pr-1">
          <Form.Group>
            <Form.Label htmlFor="stage_name">Name</Form.Label>
            <Form.Control
              type="text"
              name="stage_name"
              id="stage_name"
              onChange={(e) => setStageName(e.target.value)}
              ref={register()}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="stage_width">Width</Form.Label>
            <Form.Control
              type="number"
              name="stage_width"
              id="stage_width"
              onChange={(e) => updateStageWidth(e)}
              ref={register()}
            />
          </Form.Group>
        </Col>
        <Col className="p-0 ">
          <Form.Group>
            <Form.Label htmlFor="stage_ext">Ext.</Form.Label>
            <Select
              options={options}
              name="stage_ext"
              id="stage_ext"
              className="form-select"
              classNamePrefix="select"
              onChange={handleSelectChange}
              value={selectedOption}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="stage_height">Height</Form.Label>
            <Form.Control
              type="number"
              name="stage_height"
              id="stage_height"
              onChange={(e) => updateStageHeight(e)}
              ref={register()}
            />
          </Form.Group>
        </Col>
        <Button variant="secondary" block onClick={downloadImage}>
          Download Image
        </Button>
      </Row>
    </Fragment>
  );
}
