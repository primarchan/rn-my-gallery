import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const useGallery = () => {
  const [images, setImages] = useState([]);

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

  // 이미지 추가를 위한 버튼 영역
  const imagesWithAddButton = [
    ...images,
    {
      id: -1,
      uri: "",
    },
  ];

  return { images, imagesWithAddButton, pickImage, deleteImage };
};
