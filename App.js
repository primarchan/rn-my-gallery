import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";

import { useGallery } from "./src/use-gallery";

export default function App() {
  const { images, imagesWithAddButton, pickImage, deleteImage } = useGallery();

  const width = Dimensions.get("screen").width;
  const columnSize = width / 3;

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPressImage = (imageId) => deleteImage(imageId);

  const renderItem = ({ item: { id, uri }, index }) => {
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "100%", fontSize: 45 }}>+</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onLongPress={() => onLongPressImage(id)}>
        <Image
          source={{ uri: uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={imagesWithAddButton}
        renderItem={renderItem}
        numColumns={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
});
