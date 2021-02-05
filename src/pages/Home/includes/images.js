import React, { Fragment, useRef } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";
import "konva/lib/shapes/Image";

export default function ImageComponent({
  image,
  isSelected,
  onSelect,
  onChange,
}) {
  const [img] = useImage(image.preview);
  const shapeRef = useRef();
  const trRef = useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <Fragment>
      <Image
        image={img}
        x={100}
        y={0}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...image}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...image,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
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
          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
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
      {/* <Image
        image={img}
        x={100}
        y={0}
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        onDragStart={() => console.log("image drag start")}
        onDragEnd={() => console.log("image drag end")}
        draggable
      /> */}
    </Fragment>
  );
}
