import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Container, VStack, Text, Input, Button, Box, Image } from "@chakra-ui/react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DraggableLabel from "../components/DraggableLabel";

const Index = () => {
  const [image, setImage] = useState(null);
  const [labels, setLabels] = useState([]);
  const [labelText, setLabelText] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddLabel = () => {
    setLabels([...labels, { text: labelText, x: 0, y: 0 }]);
    setLabelText("");
  };

  const moveLabel = (index, x, y) => {
    const newLabels = [...labels];
    newLabels[index] = { ...newLabels[index], x, y };
    setLabels(newLabels);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Upload Floor Plan</Text>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && (
            <Box position="relative" border="1px solid black" width="100%" height="500px" mt={4}>
              <Image src={image} alt="Floor Plan" objectFit="contain" width="100%" height="100%" />
              {labels.map((label, index) => (
                <DraggableLabel key={index} index={index} label={label} moveLabel={moveLabel} />
              ))}
            </Box>
          )}
          <Input
            placeholder="Enter label text"
            value={labelText}
            onChange={(e) => setLabelText(e.target.value)}
          />
          <Button onClick={handleAddLabel}>Add Label</Button>
        </VStack>
      </Container>
    </DndProvider>
  );
};

export default Index;