import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import English from "../components/language/en-US.json"
import Armenian from "../components/language/hy-AM.json";

export const Context = React.createContext();

const local = navigator.language;

let lang;
if(local === "en-US") {
    lang = English;
}else {
    lang = Armenian;
}

const Wrapper = (props) => {
    const [locale,setLocale] = useState(local);
    const [messages,setMessages] = useState(lang)

    function selectLang(e) {
        const newLocale = e.target.value;
        setLocale(newLocale);
        if( newLocale === "hy-AM" ){
            setMessages(Armenian);
        }else {
            setMessages(English)
        }
    }

    return (
        <Context.Provider value = {{locale,selectLang}}> 
        <IntlProvider messages={messages} locale={locale}>
            {props.children}
        </IntlProvider>
        </Context.Provider>
    )
}

export default Wrapper