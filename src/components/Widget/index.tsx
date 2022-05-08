import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ChatTeardropDots } from "phosphor-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { styles } from "./styles";
import { theme } from "../../theme";

import { Form } from "../Form";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { Success } from "../Success";
import { Options } from "../Options";

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [wasFeedbackSent, setWasFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpenBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  function handleChangeFeedbackType(feedbackType: FeedbackType) {
    setFeedbackType(feedbackType);
  }

  function handleChangeFeedbackSent() {
    setWasFeedbackSent(true);
  }

  function handleResetWidget() {
    setFeedbackType(null);
    setWasFeedbackSent(false);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpenBottomSheet}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
        keyboardBehavior="interactive"
      >
        {wasFeedbackSent ? (
          <Success onResetWidget={handleResetWidget} />
        ) : feedbackType ? (
          <Form
            feedbackType={feedbackType}
            onLeftForm={handleResetWidget}
            onFeedbackSent={handleChangeFeedbackSent}
          />
        ) : (
          <Options onChangeFeedbackType={handleChangeFeedbackType} />
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
