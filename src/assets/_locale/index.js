import enUS from './en_US'
import zhCN from './zh_CN'
import querystring from "query-string";
const defaultMessageSet = zhCN;
let currentMessageSet = defaultMessageSet;

const localeSet = {
    "enUS": {
        title: "English US",
        messages: enUS
    },
    "zhCN": {
        title: "中文",
        messages: zhCN
    },
};
const switchLanguage = (selectLocale) => {
    const locale = localeSet[selectLocale];
    if (locale) {
        currentMessageSet = locale.messages
        return;
    }
}

const i18n = (messageKey, dataType) => {
    const slices = messageKey.split('_');
    slices.forEach((subStr, idx) => {
        slices[idx] = subStr.slice(0, 1).toLowerCase() + subStr.slice(1)
    });
	var msg = "";
	var parentType = "";
	var childType = "";
	if ('top' == dataType) {
		messageKey = slices[2] + "." + slices[3];
		parentType = currentMessageSet[slices[0]];
		childType = currentMessageSet[slices[1]];
		if (!parentType) {
			parentType = slices[0];
		}
		if (!childType) {
			childType = slices[1];
		}
	} else {
		messageKey = slices[0] + "." + slices[1];
	}
	msg = currentMessageSet[messageKey];
    if (!msg) {
        msg = messageKey;
    }
	const params = querystring.parse(window.location.search);
	if ('top' == dataType) {
		return parentType + ":" + params.platformId + "前5名" + childType + msg;
	}
	parentType = currentMessageSet[params.platformType.slice(0, 1).toLowerCase() + params.platformType.slice(1)];
	if (!parentType) {
		parentType = params.platformType;
	}
	return parentType + ":" + params.platformId + msg;

}
const i18nRaw = (messageKey) => {
    const slices = messageKey.split('_');
    slices.forEach((subStr, idx) => {
        slices[idx] = subStr.slice(0, 1).toLowerCase() + subStr.slice(1)
    });
    messageKey = slices.join(".");
    const msg = currentMessageSet[messageKey];
    if (!msg) {
        return messageKey;
    }
    return msg;

}

const Locale = {
    switchLanguage,
    i18n,
	i18nRaw
};

export default Locale;