import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Modal,
  Pressable,
} from "react-native";

export default ({
  modalVisible,
  albumTitle,
  setAlbumTitle,
  onSubmitEditing,
  onPressBackDrop,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable onPress={onPressBackDrop} style={{ flex: 1 }}>
          <SafeAreaView
            style={{ width: "100%", position: "absolute", bottom: 0 }}
          >
            <TextInput
              placeholder="앨범명을 입력해주세요."
              style={{
                width: "100%",
                padding: 10,
                borderWidth: 0.5,
                borderColor: "lightgrey",
              }}
              value={albumTitle}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              autoFocus={true}
            />
          </SafeAreaView>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};
