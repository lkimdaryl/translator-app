import {StyleSheet, Text, View } from 'react-native';
import {useEffect, useState} from 'react';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
// console.log(OPEN_AI_API_KEY);

interface OutputAreaProps {
    incomingTranslatedText: string;
  }
const OutputArea: React.FC<OutputAreaProps> = ({ incomingTranslatedText }) => {
    const [translatedText, setTranslatedText] = useState('');

    useEffect(() => {
        setTranslatedText(incomingTranslatedText);
        if (incomingTranslatedText !== '') {
            textToSpeech(incomingTranslatedText);
        }
    }, [incomingTranslatedText]);
    

    const textToSpeech = async (text: string) => {
        try {
            const response = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
                    'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    model: 'tts-1',
                    input: text,
                    voice: 'alloy',
                    response_format: 'mp3'
                })
            });

            const audioBlob = await response.blob();
            const reader = new FileReader();
        
            reader.onloadend = async () => {
                const base64data = reader.result;
                const { sound } = await Audio.Sound.createAsync({ uri: base64data as string });
                await sound.playAsync();
            };
        
            reader.readAsDataURL(audioBlob);

        } catch (error: any) {
            console.error(error);
        }
    }

    return (
        <View style={styles.outputArea}>
            {/* <Text>Translation:</Text> */}
            <Text>{translatedText ? translatedText : 'Translation:'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    outputArea: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ddd',
        position: 'relative',
        marginTop: 10,
    }
})

{/* <TouchableOpacity style={styles.microphoneButton}>
<Text style={styles.microphoneIcon}>🎤</Text>
</TouchableOpacity> */}

export default OutputArea