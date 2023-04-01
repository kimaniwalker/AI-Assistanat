import React, { useState, createContext } from "react";
import { BotPreferences } from "../utils/types";
import { useLocalStorage } from "../utils/useLocalStorage";

interface BotProviderProps {
    children: React.ReactNode
}

export const BotContext = createContext({
    setPreferences: ({ preferences }: BotPreferences) => { preferences },
    preferences: {
        preferences: {
            bot_name: '',
            prompt: '',
        }
    }
});

export const BotWrapper = ({ children }: BotProviderProps) => {
    const [preferences, setPreferences] = useState<BotPreferences>({
        preferences: {
            bot_name: '',
            prompt: '',
        }
    })
    const { getData } = useLocalStorage()
    React.useEffect(() => {
        getPreferences()
    }, [])


    const getPreferences = async () => {
        let data = await getData('bot_preferences')
        if (data) {
            console.log('data')
            console.log(data)
            let parsedData = JSON.parse(data)
            setPreferences({
                preferences: {
                    bot_name: parsedData.bot_name,
                    prompt: parsedData.prompt
                }
            })
        }
    }

    return (
        <BotContext.Provider value={{
            setPreferences, preferences
        }
        }>
            {children}
        </BotContext.Provider>
    );
};

export function useBotContext() {
    return React.useContext(BotContext)
}