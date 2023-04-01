import { Alert } from "react-native";
import { OPENAIKEY } from "./envVariables";
import { makeRequestData } from "./types";
import React from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { useLocalStorage } from "./useLocalStorage";

const axios = require('axios').default;


export const useChatGpt = () => {

    const { getData, storeData } = useLocalStorage()
    const [conversation, setConversation] = React.useState<string[]>([])
    const [isLoading, setIsLoading] = React.useState(false)

    async function makeRequest({ url, data }: makeRequestData) {
        try {
            setIsLoading(true)
            const response = await axios.post(url, data, {
                headers: {
                    "Authorization": `Bearer ${OPENAIKEY}`
                }
            });
            console.log('new response from server')
            console.log(response.data.choices[0].text);


            consolidateConversation({ lastResponse: response.data.choices[0].text, conversation: data.prompt })
            setIsLoading(false)
            return response
        } catch (error: any) {
            console.error(error);
            Alert.alert(error.message)
            setIsLoading(false)
        }
    }

    function consolidateConversation({ conversation, lastResponse }: any) {

        setConversation((conversation) => [...conversation, `Scooter: ${lastResponse}`])

        let convo = conversation?.split("\n\n")
        convo.pop()
        convo.push(`Scooter: ${lastResponse}`)

        let storedConvo = convo.join("\n\n")
        console.log(storedConvo)




        storeData({ key: 'conversation', value: storedConvo })


        return convo

    }

    async function getConversation() {

        const conversation = await getData('conversation')
        return conversation

    }

    return { makeRequest, consolidateConversation, getConversation, conversation, setConversation, isLoading }

}