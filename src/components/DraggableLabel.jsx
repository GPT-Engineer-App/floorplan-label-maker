import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Box, Text } from "@chakra-ui/react";

const DraggableLabel = ({ index, label, moveLabel }) => {
  const [, ref] = useDrag({
    type: "label",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "label",
    hover: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const x = Math.round(label.x + delta.x);
      const y = Math.round(label.y + delta.y);
      moveLabel(index, x, y);
    },
  });

  return (
    <Box
      ref={(node) => ref(drop(node))}
      position="absolute"
      left={`${label.x}px`}
      top={`${label.y}px`}
      bg="black"
      color="white"
      p={2}
      cursor="move"
    >
      <Text>{label.text}</Text>
    </Box>
  );
};

export default DraggableLabel;