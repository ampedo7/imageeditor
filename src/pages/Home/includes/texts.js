import React, { Fragment, useRef } from "react";
import { Text, Transformer } from "react-konva";
import "konva/lib/shapes/Text";

export default function TextComponents({
  textProps,
  isSelected,
  setSelectedText,
  onSelect,
  onChange,
}) {
  const shapeRef = useRef();
  const trRef = useRef();

  const handleDragEnd = (e) => {
    const onDragData = {
      ...textProps,
      x: e.target.x(),
      y: e.target.y(),
    };
    onChange(onDragData);
    setSelectedText(onDragData);
  };

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleTransform = (e) => {
    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);
    const transformData = {
      ...textProps,
      x: node.x(),
      y: node.y(),
      // set minimal value
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
    };
    onChange(transformData);
    setSelectedText(transformData);
  };
  return (
    <Fragment>
      <Text
        onClick={onSelect}
        // onClick={(e) => handleOnClick(e)}
        onTap={onSelect}
        ref={shapeRef}
        {...textProps}
        fill={textProps.fill}
        // fill={isSelected ? "blue" : textProps.fill}
        draggable
        onDragEnd={(e) => handleDragEnd(e)}
        onTransform={(e) => handleTransform(e)}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
}
