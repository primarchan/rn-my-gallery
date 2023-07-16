import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useGallery } from "./src/use-gallery";
import TextInputModal from "./src/TextInputModal";
import MyDropDownPicker from "./src/MyDropDownPicker";
import BigImageModal from "./src/BigImageModal";

export default function App() {
  const {
    imagesWithAddButton,
    selectedAlbum,
    textInputModalVisible,
    albumTitle,
    isDropDownOpen,
    albums,
    bigImageModalVisible,
    selectedImage,
    showPreviousArrow,
    showNextArrow,
    pickImage,
    deleteImage,
    openTextInputModal,
    closeTextInputModal,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    openDropDown,
    closeDropDown,
    selectAlbum,
    deleteAlbum,
    openBigImageModal,
    closeBigImagetModal,
    selectImage,
    moveToPreviousImage,
    moveToNextImage,
  } = useGallery();

  const width = Dimensions.get("screen").width;

  const columnSize = width / 3;

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPressImage = (imageId) => deleteImage(imageId);

  const onPressWatchAd = () => {
    console.log("Loading AD");
  };

  const onPressAddAlbum = () => {
    if (albums.length >= 2) {
      Alert.alert("광고를 시청해야 앨범을 시청할 수 있습니다.", "", [
        {
          style: "cancel",
          text: "닫기",
        },
        {
          text: "광고 시청",
          onPress: onPressWatchAd,
        },
      ]);
    } else {
      openTextInputModal();
    }
  };

  const onSubmitEditing = () => {
    if (!albumTitle) return;

    addAlbum();
    closeTextInputModal();
    resetAlbumTitle();
  };

  const onPressTextInputBackDrop = () => closeTextInputModal();

  const onPressHeader = () => {
    if (isDropDownOpen) {
      closeDropDown();
    } else {
      openDropDown();
    }
  };

  const onPressAlbum = (album) => selectAlbum(album);

  const onLongPressAlbum = (albumId) => deleteAlbum(albumId);

  const onPressImage = (image) => {
    selectImage(image);
    openBigImageModal();
  };

  const onPressBigImageModalBackDrop = () => closeBigImagetModal();

  const onPressLeftArrow = () => moveToPreviousImage();
  const onPressRightArrow = () => moveToNextImage();

  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;

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
      <TouchableOpacity
        onPress={() => onPressImage(image)}
        onLongPress={() => onLongPressImage(id)}
      >
        <Image
          source={{ uri: uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 앨범 DropDown, 앨범 추가 버튼 */}
      <MyDropDownPicker
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        onPressHeader={onPressHeader}
        isDropDownOpen={isDropDownOpen}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
      />

      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal
        textInputModalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBaonPressTextInputBackDropckDrop={onPressTextInputBackDrop}
      />

      {/* 이미지를 크게 보는 모달 */}
      <BigImageModal
        bigImageModalVisible={bigImageModalVisible}
        onPressBigImageModalBackDrop={onPressBigImageModalBackDrop}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />

      {/* 이미지 리스트 */}
      <FlatList
        data={imagesWithAddButton}
        renderItem={renderItem}
        numColumns={3}
        style={{ zIndex: -1 }}
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
