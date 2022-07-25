import React from 'react';
import {Modal, Text, TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ViewContainer = styled.View`
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  width: 80%;
  height: 400px;
`;

const ModalButton = styled.TouchableOpacity`
  align-self: center;
  background: #00008b;
  width: 30%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

const ModalText = styled.Text`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  max-width: 80%;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

interface Props {
  isModalVisible: boolean;
  deleteImage(): void;
  closeModal(): void;
}

export const DeleteModal = ({
  isModalVisible,
  closeModal,
  deleteImage,
}: Props) => {
  return (
    <Modal visible={isModalVisible}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <Container>
          <TouchableWithoutFeedback>
            <ViewContainer>
              <ModalText>{'Are you want to  delete image'}</ModalText>
              <View style={{flexDirection: 'row'}}>
                <ModalButton
                  onPress={() => {
                    deleteImage();
                    closeModal();
                  }}>
                  <ButtonText>{'Yes'}</ButtonText>
                </ModalButton>
                <ModalButton
                  onPress={() => {
                    closeModal();
                  }}>
                  <ButtonText>{'No'}</ButtonText>
                </ModalButton>
              </View>
            </ViewContainer>
          </TouchableWithoutFeedback>
        </Container>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
