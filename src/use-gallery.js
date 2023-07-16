import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const defaultAlbum = {
  id: 1,
  title: "기본",
};

export const useGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [textInputModalVisible, setTextInputModalVisible] = useState(false);
  const [bigImageModalVisible, setBigImageModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;

      const newImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
        albumId: selectedAlbum.id,
      };
      setImages([...images, newImage]);
    }
  };

  const deleteImage = (imageId) => {
    Alert.alert("이미지를 삭제하시겠어요?", "", [
      {
        style: "cancel",
        text: "아니요",
      },
      {
        text: "네",
        onPress: () => {
          const newImages = images.filter((image) => image.id !== imageId);
          setImages(newImages);
        },
      },
    ]);
  };

  const openTextInputModal = () => setTextInputModalVisible(true);
  const closeTextInputModal = () => setTextInputModalVisible(false);
  const openBigImageModal = () => setBigImageModalVisible(true);
  const closeBigImagetModal = () => setBigImageModalVisible(false);
  const openDropDown = () => setIsDropDownOpen(true);
  const closeDropDown = () => setIsDropDownOpen(false);

  const addAlbum = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;

    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };

    setAlbums([...albums, newAlbum]);
    setSelectedAlbum(newAlbum);
  };

  const selectAlbum = (album) => {
    setSelectedAlbum(album);
    closeDropDown();
  };

  const deleteAlbum = (albumId) => {
    if (albumId === defaultAlbum.id) {
      Alert.alert("기본 앨범을 삭제할 수 없어요.");
      return;
    }

    Alert.alert("앨범을 삭제하시겠어요?", "", [
      {
        style: "cancel",
        text: "아니요",
      },
      {
        text: "네",
        onPress: () => {
          const newAlbums = albums.filter((album) => album.id !== albumId);
          setAlbums(newAlbums);
          setSelectedAlbum(defaultAlbum);
        },
      },
    ]);
  };

  const selectImage = (image) => setSelectedImage(image);

  const resetAlbumTitle = () => setAlbumTitle("");

  const filteredImages = images.filter(
    (image) => image.albumId === selectedAlbum.id
  );
  // 이미지 추가를 위한 버튼 영역
  const imagesWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: "",
    },
  ];

  return {
    imagesWithAddButton,
    selectedAlbum,
    textInputModalVisible,
    albumTitle,
    isDropDownOpen,
    albums,
    bigImageModalVisible,
    selectedImage,
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
  };
};
