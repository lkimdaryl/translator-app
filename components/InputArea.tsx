import { Button, StyleSheet, TextInput, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import Microphone from './microphone';

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
const OPEN_AI_API_ENDPOINT = process.env.OPEN_AI_API_ENDPOINT;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID;
const PROJECT_ID = process.env.PROJECT_ID;

// console.log(`from input area component | api key: ${OPEN_AI_API_KEY}`);
// console.log(`from input area component | api endpoint: ${OPEN_AI_API_ENDPOINT}`);
// console.log(`from input area component | organization id: ${ORGANIZATION_ID}`);
// console.log(`from input area component | project id: ${PROJECT_ID}`);

interface InputAreaProps {
    onTranslate: (text: string) => void;
    originLanguage: string;
    translationLanguage: string;
}

const InputArea = ({onTranslate, originLanguage, translationLanguage}: InputAreaProps) => {
    const [inputText, setInputText] = useState('');
    const [enable, setEnable] = useState(false);

    const translateText = async () => {
        try {
            const response = await fetch(`${OPEN_AI_API_ENDPOINT}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
                'OpenAI-Organization': `${ORGANIZATION_ID}`,
                'OpenAI-Project': `${PROJECT_ID}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ 
                        role: "user", 
                        content: `Translate this from ${originLanguage} to ${translationLanguage}: ${inputText}` 
                    }],
                    temperature: 0.1
                }),
            });


            const data = await response.json();
                const translatedText = data.choices[0].message.content;
                onTranslate(translatedText);
        } catch (error: any) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (inputText !== '') {
            setEnable(true);
        }else {
            setEnable(false);
        }
    }, [inputText]);
    
    return (
        <>
        <View style={styles.inputArea}>
            <TextInput
                style={styles.inputArea}
                placeholder={originLanguage}
                multiline
                value={inputText}
                onChangeText={setInputText} />
            <Microphone setTranscript={setInputText}/>
        </View>
        <View style={styles.translateButton}>
            <Button disabled={!enable} title="Translate" onPress={translateText} />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputArea: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ddd',
        marginBottom: 10,
        textAlignVertical: 'top',
    },
    translateButton: {
        width: 150,
        alignSelf: 'center',
    }
})

export default InputArea;

