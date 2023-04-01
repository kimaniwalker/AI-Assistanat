import Loading from '../../components/Loading';
import React, { useRef } from 'react';
import { useChatGpt } from '../../utils/useChatGpt';
import styled from 'styled-components/native';
import ChatBubble from '../../components/chat/ChatBubble';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, ScrollView } from 'react-native';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { useRoute } from '@react-navigation/native'
import { useBotContext } from '../../context/botPreferences';

export default function Chat() {

    const { makeRequest, getConversation, conversation, setConversation, consolidateConversation, isLoading } = useChatGpt()
    const { removeData } = useLocalStorage()

    const ref = useRef<ScrollView | null>(null)
    const height = Dimensions.get('window')
    const actualArea = height.height - 200
    const messageHeight = actualArea / 4 * 3
    console.log(messageHeight)
    const [value, setValue] = React.useState('')
    const route: any = useRoute()



    React.useEffect(() => {
        //removeData('conversation')
        //getConversation()
        makeRequest({
            url: 'https://api.openai.com/v1/completions',
            data: {
                "model": "text-davinci-003",
                "prompt": `${route.params.prompt}\n\n${route.params.bot_name}: Hello my name is ${route.params.bot_name}\n\n${route.params.bot_name}:`,
                "temperature": 0.9,
                "max_tokens": 150,
                "top_p": 1,
                "frequency_penalty": 0.0,
                "presence_penalty": 0.6,
                "user": 'jscott22',
                "stop": ["Human:", `${route.params.bot_name}:`]
            }
        })

    }, [])

    const handlePress = () => {

        setConversation((conversation) => [...conversation, `Human:${value}`])

        const prompt = `${route.params.prompt}\n\n${conversation.join("\n\n")}\n\nHuman: ${value}\n\n${route.params.bot_name}: `

        console.log(prompt)

        makeRequest({
            url: 'https://api.openai.com/v1/completions',
            data: {
                "model": "text-davinci-003",
                "prompt": `${prompt}`,
                "temperature": 0.9,
                "max_tokens": 150,
                "top_p": 1,
                "frequency_penalty": 0.0,
                "presence_penalty": 0.6,
                "user": 'jscott22',
                "stop": ["Human:", `${route.params.bot_name}:`]
            }
        })

        setValue('')

    }



    return (

        <Wrapper>
            <MessageWrapper height={messageHeight}>
                <ScrollView ref={ref}
                    onLayout={() => ref.current?.scrollToEnd({ animated: true })}
                    onContentSizeChange={() => ref.current?.scrollToEnd({ animated: true })}
                    snapToEnd
                    showsVerticalScrollIndicator={false}
                    snapToStart={false}
                    scrollsToTop={false}
                    snapToAlignment="end">

                    {conversation.map((item: string) => {

                        let isBot = item.includes('Scooter:')
                        let text = isBot ? item.replace('Scooter:', '') : item.replace('Human:', '')

                        return (

                            <ChatBubble key={item} message={text} direction={isBot ? 'flex-start' : 'flex-end'} color={isBot ? 'lightblue' : 'green'} />
                        )
                    })}

                    {isLoading && <ChatBubble isLoading={true} color="transparent" direction='flex-start' />}

                </ScrollView>
            </MessageWrapper>

            <TextInput>
                <InputWrapper height={150}>
                    <TextBox
                        value={value}
                        onChangeText={setValue}
                        multiline
                        onFocus={() => {
                        }} />
                    <StyledButton>
                        <Button onPress={handlePress}>
                            <SendButton name="send-circle" size={48} color="black" />
                        </Button>
                    </StyledButton>
                </InputWrapper>
            </TextInput>
        </Wrapper>

    );
}

const Wrapper = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    padding: 16px;   
`

const MessageWrapper = styled.View<{ height: number }>`
  width: 100%;
  max-height: ${({ height }) => height + 'px'};
  display: flex;
  margin: 16px 0; 
`
const TextBox = styled.TextInput`
  flex: 1;
  min-height: 50px;
  font-size: 18px;
  padding: 8px;
  position: relative;
`
const InputWrapper = styled.View<{ height: number }>`
  flex-direction: row;
  border-radius: 8px;
  border: 2px solid black;
  justify-self: flex-end;
  align-self: flex-end;
  max-height: ${({ height }) => height + 'px'};
`
const SendButton = styled(MaterialCommunityIcons)`
  transform: rotate(-90deg);
`
const Button = styled.Pressable`
  
`
const StyledButton = styled.View`
 display: flex;
 align-items: flex-end;
 justify-content: flex-end; 
`
const TextInput = styled.View`
    justify-content: flex-end;
    margin: 16px 0;
    padding: 16px 16px;
    display: flex;

`
