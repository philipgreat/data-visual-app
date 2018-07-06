

const i18n = (messageKey, dataType, parentType, parentId) => {
    const slices = messageKey.split('_');
    slices.forEach((subStr, idx) => {
        slices[idx] = subStr.slice(0, 1).toLowerCase() + subStr.slice(1)
    });
	var msg = "";
	var parentTypeZh = messages[parentType.slice(0, 1).toLowerCase() + parentType.slice(1)];
	if (!parentTypeZh) {
		parentTypeZh = parentType;
	}
	var childType = "";
	if ('top' == dataType) {
		messageKey = slices[2] + "." + slices[3];
		
		childType = messages[slices[1]];
		
		if (!childType) {
			childType = slices[1];
		}
	} else {
		messageKey = slices[0] + "." + slices[1];
	}
	if (messageKey.indexOf("cOUNT") > 0) {
		const rst = messageKey.split('.');
		msg = messages[rst[0]] + messages[rst[1]];
	} else {
		msg = messages[messageKey];
	}
    if (!msg) {
        msg = messageKey;
    }
	
	if ('top' == dataType) {
		return parentTypeZh + ":" + parentId + "前5名" + childType + msg;
	}

	return parentTypeZh + ":" + parentId + msg;

}
const i18nRaw = (messageKey) => {
    const slices = messageKey.split('_');
    slices.forEach((subStr, idx) => {
        slices[idx] = subStr.slice(0, 1).toLowerCase() + subStr.slice(1)
    });
    messageKey = slices.join(".");
    const msg = messages[messageKey];
    if (!msg) {
        return messageKey;
    }
    return msg;

}

const Locale = {
    i18n,
	i18nRaw
};
