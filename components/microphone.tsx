import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Recording } from 'expo-av/build/Audio';

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID;
const PROJECT_ID = process.env.PROJECT_ID;

// console.log(OPEN_AI_API_KEY);
// console.log(ORGANIZATION_ID);
// console.log(PROJECT_ID);

interface MicrophoneProps {
    setTranscript: (text: string) => void;
}

const Microphone = ({ setTranscript }: MicrophoneProps) => {
    const [isListening, setIsListening] = useState(false);
    const [recording, setRecording] = useState<Recording | undefined>(undefined);

    const handleTap = () => {
        setIsListening(!isListening);
    }

    useEffect(() => {
        if (isListening) {
            startRecording();
            return
        }else {
            stopRecording();}
    }, [isListening]);

    const startRecording = async () => {
        try {
            const permissions = await Audio.requestPermissionsAsync();
            if (permissions.granted) {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                })

                const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY);
                setRecording(recording);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const stopRecording = async () => {
        setIsListening(false);
        console.log('Stopping recording..');
        setRecording(undefined);
        if (recording) {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            transcribeAudio(uri);
        }
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
    }

    const transcribeAudio = async (uri: string | null) => {
        if (!uri) return;

        try {
            const formData = new FormData();
            formData.append('file', {
                uri: uri,
                name: 'audio.m4a',
                type: 'audio/m4a',
            });
            formData.append('model', 'whisper-1');

            const transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
                    'OpenAI-Organization': `${ORGANIZATION_ID}`,
                    'OpenAI-Project': `${PROJECT_ID}`,
                },
                body: formData,
            });
            
            const transcription = await transcriptionResponse.json();
            setTranscript(transcription.text);

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
        {isListening ?
            <TouchableOpacity style={styles.closeButton} onPress={handleTap}>
                <Text style={styles.closeIcon}>■</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={styles.microphoneButton} onPress={handleTap}>
                <Text style={styles.microphoneIcon}>🎤</Text>
            </TouchableOpacity>
        }
        </>
    )
}

const styles = StyleSheet.create({
    microphoneButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
    },
    microphoneIcon: {
        fontSize: 24,
    },
    closeButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    closeIcon: {
        fontSize: 24,
        color: 'red',
    }
});

export default Microphone