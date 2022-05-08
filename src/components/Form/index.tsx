import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as FileSystem from "expo-file-system";
import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import {
  Image, Text, TouchableOpacity,
  View
} from "react-native";
import { captureScreen } from "react-native-view-shot";
import { FeedbackType } from "../../components/Widget";
import { api } from "../../libs/api";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { FeedbackButton } from "../FeedbackButton";
import { ScreenshotButton } from "../ScreenshotButton";
import { styles } from "./styles";

interface Props {
  feedbackType: FeedbackType;
  onLeftForm: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onLeftForm, onFeedbackSent }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState("");

  const feedbackInfo = feedbackTypes[feedbackType];

  function handleTakeScreenshot() {
    captureScreen({
      format: "png",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((err) => console.error(err));
  }

  function handleRemoveScreenshot() {
    setScreenshot(null);
  }

  function convertImageToBase64(image: string) {
    const imageBase64 = FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    return imageBase64;
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) return;

    setIsSendingFeedback(true);

    const screenshotBase64 = screenshot && convertImageToBase64(screenshot);

    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot: screenshotBase64,
      });

      onFeedbackSent();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onLeftForm}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackInfo.image} style={styles.titleImage} />
          <Text style={styles.titleText}>{feedbackInfo.title}</Text>
        </View>
      </View>

        <BottomSheetTextInput
          multiline
          onChangeText={setComment}
          style={styles.input}
          placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
          placeholderTextColor={theme.colors.text_secondary}
        />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeShot={handleTakeScreenshot}
          onRemoveShot={handleRemoveScreenshot}
        />
        <FeedbackButton
          disabled={comment.length === 0}
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>
    </View>
  );
}
