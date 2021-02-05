import React, { Fragment, useState, useRef } from "react";
import { Wrapper } from "./styles";
import { Helmet } from "react-helmet";
import TextComponents from "./includes/texts";
import ImageComponent from "./includes/images";
import FormsComponent from "./includes/forms";
import { Container, Row, Col } from "react-bootstrap";
import { Stage, Layer } from "react-konva";
// import { remove } from "lodash";

const Home = () => {
  const stageRef = useRef();
  const [texts, setTexts] = useState([]);
  const [stageWidth, setStageWidth] = useState(790); //1280
  const [stageHeight, setStageHeight] = useState(650); // 720
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [selectedText, setSelectedText] = useState({});
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [files, setFiles] = useState();

  const checkDeselect = (e, fromFile = false) => {
    // deselect when clicked on empty area
    let clickedOnEmpty = 0;
    if (fromFile) {
      clickedOnEmpty = e.current === e.current.getStage();
    } else {
      clickedOnEmpty = e.target === e.target.getStage();
    }
    if (clickedOnEmpty) {
      setSelectedTextId(null);
      setSelectedImageId(null);
      setSelectedText(null);
    }
  };

  const handleImageOnSelect = (image) => {
    const id = image.index;
    setSelectedImageId(id);
    setSelectedText(null);
    setSelectedTextId(null);
  };
  const handleImageOnChange = (newAttrs, files, i) => {
    const _files = files.slice();
    _files[i] = newAttrs;
    setFiles(_files);
  };

  const handleTextOnSelect = (text, i) => {
    const id = text.id;
    text.index = i;
    setSelectedTextId(id);
    setSelectedText(text);
    setSelectedImageId(null);
  };

  const handleTextOnChange = (newAttrs, texts, i) => {
    const _texts = texts.slice();
    _texts[i] = newAttrs;
    setTexts(_texts);
    // setSelectedText(_texts);
  };

  const handleDeleteImage = (index) => {
    const items = files.slice();
    const item = items.find((i) => i.index === index);
    const _index = items.indexOf(item);
    // remove from the list:
    items.splice(_index, 1);
    setFiles(items);
  };
  const handleDeleteText = (index) => {
    const items = texts.slice();
    const item = items.find((i) => i.id === index);
    const _index = items.indexOf(item);
    // remove from the list:
    items.splice(_index, 1);
    setTexts(items);
  };
  return (
    <Fragment>
      <Helmet>
        <title>Home | Image Editor</title>
      </Helmet>
      <Wrapper>
        <Container className="mt-5">
          <Row>
            <Col className="canvas-container p-0 ">
              <Stage
                ref={stageRef}
                width={parseInt(stageWidth)}
                height={parseInt(stageHeight)}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
              >
                <Layer className="layer-images">
                  {files &&
                    files.map((image, i) => {
                      return (
                        <ImageComponent
                          key={i}
                          image={image}
                          isSelected={image.index === selectedImageId}
                          onSelect={() => handleImageOnSelect(image)}
                          onChange={(newAttrs) =>
                            handleImageOnChange(newAttrs, files, i)
                          }
                        />
                      );
                    })}
                </Layer>
                <Layer>
                  {texts.map((text, i) => {
                    return (
                      <TextComponents
                        key={i}
                        textProps={text}
                        isSelected={text.id === selectedTextId}
                        selectedTextId={selectedTextId}
                        selectedText={selectedText}
                        setSelectedText={setSelectedText}
                        onSelect={() => handleTextOnSelect(text, i)}
                        // onSelect={(_text = text, index = i) =>
                        //   handleTextOnSelect(_text, index)
                        // }
                        onChange={(newAttrs) =>
                          handleTextOnChange(newAttrs, texts, i)
                        }
                      />
                    );
                  })}
                </Layer>
              </Stage>
            </Col>
            <Col lg="3">
              <FormsComponent
                checkDeselect={checkDeselect}
                stageWidth={stageWidth}
                stageHeight={stageHeight}
                setStageWidth={setStageWidth}
                setStageHeight={setStageHeight}
                stageRef={stageRef}
                setFiles={setFiles}
                selectedText={selectedText}
                setSelectedText={setSelectedText}
                files={files}
                texts={texts}
                setTexts={setTexts}
                selectedImageId={selectedImageId}
                ImageOnSelect={(image) => handleImageOnSelect(image)}
                textOnSelect={(text, i) => handleTextOnSelect(text, i)}
                handleDeleteText={(i) => {
                  handleDeleteText(i);
                }}
                handleDeleteImage={(i) => {
                  handleDeleteImage(i);
                }}
              />
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </Fragment>
  );
};

export default Home;
