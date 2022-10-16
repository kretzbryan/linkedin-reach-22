const sanitizeCarRate = (currentItem, singleItemKeys) => {
	// Expected data types in currentItem: String, Object, Array
	const isString = (item) => typeof item === 'string';
	const isObject = (item) => typeof item === 'object';
	// const isArray = (item) => Array.isArray(currentItem);

	for (let key in currentItem) {
		const isSingleItem = singleItemKeys[key];
		// If key is found in the singleItemMap above, then check if string or object
		if (isSingleItem) {
			// if the single item is a string, we just set the string to the current item field
			if (isString(currentItem[key][0])) {
				currentItem[key] = currentItem[key][0];
			}
			// If the single item is an object, we will run sanitizeCarRate() on the singleItem and set the return item as the new value
			if (isObject(currentItem[key][0])) {
				currentItem[key] = sanitizeCarRate(currentItem[key][0]);
			}
		} else {
			// if the item is expected to be an array (per documentation), map the currentItem[key] , checking if string or object. If string, the item will just be returned, if object, run sanitize car rate on item and return.
			currentItem[key] = currentItem[key].map((item) => {
				if (isString(item)) return item;
				else if (isObject(item)) {
					return sanitizeCarRate(item);
				}
			});
		}
	}
	return currentItem;
};
