import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Button, Container, ListGroup, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextWrapper } from "./styles";
import Slider from "rc-slider";
import _ from "lodash";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

export default function FormsTextComponent({
  selectedText,
  setSelectedText,
  texts,
  setTexts,
  textOnSelect,
  handleDeleteText,
}) {
  const { register, setValue, getValues } = useForm();

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [lineSpace, setLineSpace] = useState(2);
  const [lineHeight, setLineHeight] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#000000");
  const [activeAlignment, setActiveAlignment] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isReorder, setIsReorder] = useState(false);
  const [oldOrder, setOldOrder] = useState(false);

  useEffect(() => {
    if (_.some(selectedText)) {
      setValue("text_content", selectedText.text);
      setValue("color", selectedText.fill);
      setLineSpace(selectedText.letterSpacing);
      setLineHeight(selectedText.lineHeight);
      setFontSize(selectedText.fontSize);
      setActiveAlignment(selectedText.align);
      const selectedFont = _.find(options, {
        value: selectedText.fontFamily,
      });
      setSelectedOption(selectedFont);
      setIsBold(false);
      setIsItalic(false);
      if (selectedText.fontStyle === "bold italic") {
        setIsBold(true);
        setIsItalic(true);
      } else {
        if (selectedText.fontStyle === "bold") setIsBold(true);
        if (selectedText.fontStyle === "italic") setIsItalic(true);
      }
    } else {
      setValue("text_content", "");
      setValue("color", "#000000");
      setLineSpace(2);
      setLineHeight(1);
      setFontSize(16);
      const selectedFont = _.find(options, {
        value: "Arial",
      });
      setSelectedOption(selectedFont);
      setIsBold(false);
      setIsItalic(false);
      setActiveAlignment("");
    }
  }, [options, selectedText, setValue]);

  useEffect(() => {
    const _options = [
      {
        value: "Arial",
        label: "Arial",
      },
      {
        value: "Calibri",
        label: "Calibri",
      },
      {
        value: "Helvetica",
        label: "Helvetica",
      },
      {
        value: "Verdana",
        label: "Verdana",
      },
      {
        value: "Arial Narrow",
        label: "Arial Narrow",
      },
      {
        value: "Didot",
        label: "Didot",
      },
      {
        value: "Georgia",
        label: "Georgia",
      },
      {
        value: "Bookman",
        label: "Bookman",
      },
    ];
    setOptions(_options);
  }, []);

  const addText = () => {
    const textContent = getValues("text_content");
    const textId = "text" + texts.length;
    const setY = texts.length * 50 || 10;
    const fontFamily = selectedOption.value || "Arial";
    var _font = "normal";
    if (isBold && isItalic) {
      _font = "bold italic";
    } else {
      if (isBold) _font = "bold";
      if (isItalic) _font = "italic";
    }
    const defaultText = {
      // text: textId,
      text: textContent || "The Quick Brown Fox \n Jumps Over The Lazy Dog",
      x: 10,
      y: parseInt(setY),
      fill: fontColor || "#000000",
      id: textId,
      fontSize: fontSize || 16,
      fontFamily: fontFamily,
      letterSpacing: lineSpace | 2,
      fontStyle: _font,
      align: activeAlignment || "left",
      lineHeight: lineHeight, //line spacing
    };
    setTexts([...texts, defaultText]);
  };

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    updateSelectedText("fontFamily", selected.value);
  };

  const handleChangeLineSpace = (value) => {
    setLineSpace(value);
    updateSelectedText("letterSpacing", value);
  };

  const handleChangeLineHeight = (value) => {
    setLineHeight(value);
    updateSelectedText("lineHeight", value);
  };

  const handleChangeFontSize = (value) => {
    setFontSize(value);
    updateSelectedText("fontSize", value);
  };

  const handleChangeColor = (e) => {
    const value = e.target.value;
    setFontColor(value);
    updateSelectedText("fill", value);
  };

  const handleChangeText = (e) => {
    const value = e.target.value;
    updateSelectedText("text", value);
  };

  const updateAlignment = (position) => {
    updateSelectedText("align", position);
    setActiveAlignment(position);
    if (activeAlignment === position) setActiveAlignment("");
  };

  const updateFontStyle = (fontStyle) => {
    var _font = "normal";
    if (fontStyle === "bold") {
      setIsBold(!isBold);
      if (!isBold) {
        _font = "bold";
        if (isItalic) _font = "bold italic";
      } else {
        if (isItalic) {
          _font = "italic";
        } else {
          _font = "normal";
        }
      }
    }
    if (fontStyle === "italic") {
      setIsItalic(!isItalic);
      if (!isItalic) {
        _font = "italic";
        if (isBold) _font = "bold italic";
      } else {
        if (isBold) {
          _font = "bold";
        } else {
          _font = "normal";
        }
      }
    }
    updateSelectedText("fontStyle", _font);
  };

  const updateSelectedText = (key, value) => {
    if (_.some(selectedText)) {
      const index = selectedText.index;
      const newAttrs = { ...selectedText, [key]: value };
      const _texts = texts.slice();
      _texts[index] = newAttrs;
      setTexts(_texts);
      setSelectedText(newAttrs);
    }
  };

  const SortableItem = SortableElement(({ text, index }) => (
    <ListGroup.Item
      className={`container_content p-2 ${
        selectedText?.id === text.id ? "active_list" : ""
      }`}
    >
      <span>{text.text}</span>
    </ListGroup.Item>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem key={index} index={index} text={value} />
        ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setTexts(arrayMove(texts, oldIndex, newIndex));
  };

  const handleReorderClick = () => {
    setIsReorder(!isReorder);
    setOldOrder(texts);
  };

  const handleCancelReorder = () => {
    setIsReorder(!isReorder);
    setTexts(oldOrder);
  };
  return (
    <Fragment>
      <TextWrapper>
        <Container className="p-0 mt-3">
          <Button variant="outline-secondary" block onClick={addText}>
            Add Text
          </Button>
          <textarea
            rows="3"
            className="form-control mt-2 mb-2"
            name="text_content"
            ref={register()}
            onChange={(e) => handleChangeText(e)}
          ></textarea>
          <div className="bg-dark mb-2 ac-containter">
            <h5>Align & case</h5>
            <Row>
              <Col>
                <span
                  className={`icon-container ${
                    activeAlignment === "left" ? "active-icon" : ""
                  }`}
                  onClick={() => updateAlignment("left")}
                >
                  <FontAwesomeIcon className="icon-icon" icon="align-left" />
                </span>
                <span
                  className={`icon-container ${
                    activeAlignment === "center" ? "active-icon" : ""
                  }`}
                  onClick={() => updateAlignment("center")}
                >
                  <FontAwesomeIcon className="icon-icon" icon="align-center" />
                </span>
                <span
                  className={`icon-container ${
                    activeAlignment === "right" ? "active-icon" : ""
                  }`}
                  onClick={() => updateAlignment("right")}
                >
                  <FontAwesomeIcon className="icon-icon" icon="align-right" />
                </span>
                <span
                  className={`icon-container ${
                    activeAlignment === "justify" ? "active-icon" : ""
                  }`}
                  onClick={() => updateAlignment("justify")}
                >
                  <FontAwesomeIcon className="icon-icon" icon="align-justify" />
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <span
                  className={`icon-container font ${
                    isBold ? "active-icon" : ""
                  }`}
                  onClick={() => updateFontStyle("bold")}
                >
                  <FontAwesomeIcon className="icon-icon" icon="bold" />
                </span>
                <span
                  className={`icon-container font ${
                    isItalic ? "active-icon" : ""
                  }`}
                  onClick={() => updateFontStyle("italic")}
                >
                  <FontAwesomeIcon className="icon-icon" icon="italic" />
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Group>
                  <Form.Label>Font</Form.Label>
                  <Select
                    options={options}
                    name="stage_ext"
                    id="stage_ext"
                    className="form-select "
                    classNamePrefix="select"
                    onChange={handleSelectChange}
                    value={selectedOption}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="">
              <Col>
                <Form.Group>
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="color"
                    name="color"
                    defaultValue={fontColor}
                    onChange={(e) => {
                      handleChangeColor(e);
                    }}
                    ref={register()}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="">
              <Col>
                <Form.Group>
                  <Form.Label className="float-right">{fontSize}</Form.Label>
                  <Form.Label>Size</Form.Label>
                  <Slider
                    min={1}
                    max={100}
                    defaultValue={fontSize}
                    value={fontSize}
                    onChange={(e) => {
                      handleChangeFontSize(e);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="">
              <Col>
                <Form.Group>
                  <Form.Label className="float-right">{lineSpace}</Form.Label>
                  <Form.Label>Line spacing</Form.Label>
                  <Slider
                    min={1}
                    max={100}
                    defaultValue={lineSpace}
                    value={lineSpace}
                    onChange={(e) => {
                      handleChangeLineSpace(e);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="">
              <Col>
                <Form.Group>
                  <Form.Label className="float-right">{lineHeight}</Form.Label>
                  <Form.Label>Letter spacing</Form.Label>
                  <Slider
                    min={1}
                    max={100}
                    step={0.1}
                    defaultValue={lineHeight}
                    value={lineHeight}
                    onChange={(e) => {
                      handleChangeLineHeight(e);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <hr className="mb-1" />
          <ListGroup className="previewContainer ">
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
              texts ? (
                <SortableList
                  helperClass="sortableHelper"
                  items={texts}
                  onSortEnd={onSortEnd}
                />
              ) : (
                ""
              )
            ) : (
              texts &&
              texts.map((text, i) => {
                return (
                  <ListGroup.Item
                    key={i}
                    className={`container_content p-2 ${
                      selectedText?.id === text.id ? "active_list" : ""
                    }`}
                  >
                    <span
                      className="delete-icon hand"
                      onClick={() => handleDeleteText(text.id)}
                    >
                      <FontAwesomeIcon icon="times" />
                    </span>
                    <span onClick={() => textOnSelect(text, i)}>
                      {text.text}
                    </span>
                  </ListGroup.Item>
                );
              })
            )}
          </ListGroup>
        </Container>
      </TextWrapper>
    </Fragment>
  );
}
