import React from 'react'
import { BotPreferences } from '../../utils/types'
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
import { Fonts, FontSize } from '../../utils/fonts';
import StyledButton from '../StyledButton';
import { useBotContext } from '../../context/botPreferences';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

export default function Preferences() {

    const { control, handleSubmit, trigger, setValue, formState: { errors, isValid }, setError } = useForm({
        mode: 'onChange'
    });

    const { preferences, setPreferences } = useBotContext()
    const { storeData } = useLocalStorage()
    const route: any = useRoute()
    const navigation: any = useNavigation()


    React.useEffect(() => {
        setValue('prompt', route.params?.act)
        setValue('bot_name', preferences.preferences.bot_name)

        trigger()
    }, [trigger])

    const onSubmit = () => {

        setPreferences({
            preferences: {
                bot_name: control._formValues.bot_name,
                prompt: control._formValues.prompt,
            }
        })

        storeData({ value: JSON.stringify(control._formValues), key: 'bot_preferences' })

        navigation.navigate('Chat', {
            prompt: control._formValues.prompt,
            bot_name: control._formValues.bot_name
        })

    }


    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <Wrapper>

                    <Title>Give your bot a name.</Title>
                    <Label>Don't worry you can change this later if you want.</Label>
                    <Controller
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: 'This is a required field'
                            },
                        }}
                        render={({ field: { onChange, onBlur, value },
                            fieldState: { error } }) => (
                            <Input
                                isDirty={error ? true : false}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                defaultValue={preferences.preferences.bot_name}
                                placeholder="Give your bot a name"
                            />
                        )}
                        name="bot_name"
                    />

                    <Title>Give your bot a prompt.</Title>
                    <Label>Your prompt should be your bots reason for existance. Think of it as , what do you want the bot to do for you ? The more specific you are , the better tailored they are to meet your needs.</Label>
                    <Controller
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: 'This is a required field'
                            },
                        }}
                        render={({ field: { onChange, onBlur, value },
                            fieldState: { error } }) => (
                            <LargeInput
                                multiline
                                isDirty={error ? true : false}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                defaultValue={preferences.preferences.prompt}
                                placeholder="Reason for existance"
                            />
                        )}
                        name="prompt"
                    />
                    <StyledButton onPress={handleSubmit(onSubmit)} buttonTitle="Start Conversation" disabled={!isValid} />
                </Wrapper>
            </ScrollView>
        </>
    )
}

const Wrapper = styled.View`
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-bottom: 16px;
`
const Input = styled.TextInput<{ isDirty?: boolean }>`  
    width: 100%;
    height: 50px;
    border: 2px solid black;
    border-radius: 8px;
    font-family: ${Fonts.Regular};
    padding: 0 16px;
    align-self: center;
    border-color: ${({ isDirty }) => isDirty ? 'red' : 'black'};
`
const LargeInput = styled.TextInput<{ isDirty?: boolean }>`  
    width: 100%;
    min-height: 50px;
    border: 2px solid black;
    border-radius: 8px;
    font-family: ${Fonts.Regular};
    padding: 16px;
    border-color: ${({ isDirty }) => isDirty ? 'red' : 'black'};
`
const Content = styled.View`
    width: 100%;
    align-items: center;
`
const Label = styled.Text`
        font-family: ${Fonts.Light};
        font-size: 18px;
        align-self: flex-start;
        margin-bottom: 16px;
`
const Title = styled.Text`
    font-family: ${Fonts.Heading};
        font-size: ${FontSize.Medium};
        align-self: flex-start; 
        margin: 16px 0 8px;
`
const Heading = styled.Text`
    font-family: ${Fonts.Heading};
        font-size: ${FontSize.Large};
        align-self: flex-start; 
        margin: 16px 0 8px;
`
