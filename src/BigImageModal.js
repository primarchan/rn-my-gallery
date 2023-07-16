import { Modal, Pressable, Image } from "react-native";

export default ({
  bigImageModalVisible,
  onPressBigImageModalBackDrop,
  selectedImage,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={bigImageModalVisible}
    >
      <Pressable
        onPress={onPressBigImageModalBackDrop}
        style={{
          flex: 1,
          backgroundColor: `rgba(115, 115, 115, 0.5)`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable>
          <Image
            source={{ uri: selectedImage?.uri }}
            style={{ width: 280, height: 280, backgroundColor: "white" }}
            resizeMode="contain"
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};
