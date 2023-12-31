import { Alert } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultAlbum = {
  id: 1,
  title: "기본",
};

const ASYNC_KEY = {
  IMAGES: "images",
  ALBUMS: "albums",
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

  const _setItems = (newImages) => {
    setImages(newImages);
    AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImages));
  };

  const _setAlbums = (newAlbums) => {
    setAlbums(newAlbums);
    AsyncStorage.setItem(ASYNC_KEY.ALBUMS, JSON.stringify(newAlbums));
  };

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
      _setItems([...images, newImage]);
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
          _setItems(newImages);
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

    _setAlbums([...albums, newAlbum]);
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
          _setAlbums(newAlbums);
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

  const moveToPreviousImage = () => {
    if (!selectedImage) return;
    const selectedImageIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );
    const previousImageIndex = selectedImageIndex - 1;
    if (previousImageIndex < 0) return;
    const previousImage = filteredImages[previousImageIndex];
    setSelectedImage(previousImage);
  };

  const moveToNextImage = () => {
    if (!selectedImage) return;
    const selectedImageIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );
    const nextImageIndex = selectedImageIndex + 1;
    if (nextImageIndex > filteredImages.length - 1 || nextImageIndex === -1)
      return;
    const nextImage = filteredImages[nextImageIndex];
    setSelectedImage(nextImage);
  };

  const showPreviousArrow =
    filteredImages.findIndex((image) => image.id === selectedImage?.id) !== 0;

  const showNextArrow =
    filteredImages.findIndex((image) => image.id === selectedImage?.id) !==
    filteredImages.length - 1;

  // 이미지 추가를 위한 버튼 영역
  const imagesWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: "",
    },
  ];

  const initValues = async () => {
    // 이미지
    const imagesFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
    if (imagesFromStorage !== null) {
      const parsed = JSON.parse(imagesFromStorage);
      setImages(parsed);
      console.log(">> imagesFromStorage : ", imagesFromStorage);
    }

    // 앨범
    const albumsFromStorage = await AsyncStorage.getItem(ASYNC_KEY.ALBUMS);
    if (albumsFromStorage !== null) {
      const parsed = JSON.parse(albumsFromStorage);
      setAlbums(parsed);
      console.log(">> albumsFromStorage : ", albumsFromStorage);
    }
  };

  useEffect(() => {
    initValues();
  }, []);

  return {
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
  };
};
