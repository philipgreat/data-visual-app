import enUS from './en_US'
import zhCN from './zh_CN'

const defaultMessageSet = enUS;
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

const i18n = (messageKey, dataType, parentType, parentId) => {
	var msg = "";
	const slices = messageKey.split('_');
    slices.forEach((subStr, idx) => {
        slices[idx] = subStr.slice(0, 1).toLowerCase() + subStr.slice(1)
    });
	if ('entity' == dataType) {
		messageKey = slices[0] + "." + slices[1];
		if (messageKey.indexOf("cOUNT") > 0) {
			const rst = messageKey.split('.');
			msg = currentMessageSet[rst[0]] + currentMessageSet[rst[1]];
		} else {
			msg = currentMessageSet[messageKey];
		}
		if (!msg) {
			msg = messageKey;
		}
		return msg;
	}
	var parentTypeZh = currentMessageSet[parentType.slice(0, 1).toLowerCase() + parentType.slice(1)];
	if (!parentTypeZh) {
		parentTypeZh = parentType;
	}
	var childType = "";
	if ('top' == dataType) {
		messageKey = slices[2] + "." + slices[3];
		
		childType = currentMessageSet[slices[1]];
		
		if (!childType) {
			childType = slices[1];
		}
	} else {
		messageKey = slices[0] + "." + slices[1];
	}
	if (messageKey.indexOf("cOUNT") > 0) {
		const rst = messageKey.split('.');
		msg = currentMessageSet[rst[0]] + currentMessageSet[rst[1]];
	} else {
		msg = currentMessageSet[messageKey];
	}
    if (!msg) {
        msg = messageKey;
    }
	
	if ('top' == dataType) {
		return childType + msg;
	}

	return msg;

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