import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { captureScreen } from "react-native-view-shot";

import { FeedbackType } from "../../components/Widget";

import { theme } from "../../theme";
import { styles } from "./styles";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { ScreenshotButton } from "../ScreenshotButton";
import { FeedbackButton } from "../FeedbackButton";

interface Props {
  feedbackType: FeedbackType;
  onLeftForm: () => void;
}

export function Form({ feedbackType, onLeftForm }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

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

  async function handleSendFeedback() {
    setIsSendingFeedback(true);

    setIsSendingFeedback(false);
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

      <TextInput
        multiline
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
        <FeedbackButton onPress={handleSendFeedback} isLoading={isSendingFeedback} />
      </View>
    </View>
  );
}
