// injectable class로 만들어서 DI를 이용해서 여러 domain에서 사용가능하도록 개선
export const mergeObjects = <T extends object = object>(target: T, ...sources: T[]): T => {
	if (!sources.length) {
		return target;
	}
	const source = sources.shift();
	if (source === undefined) {
		return target;
	}

	if (isMergebleObject(target) && isMergebleObject(source)) {
		Object.keys(source).forEach(function (key: string) {
			if (isMergebleObject(source[key])) {
				if (!target[key]) {
					target[key] = {};
				}
				mergeObjects(target[key], source[key]);
			} else {
				target[key] = source[key];
			}
		});
	}

	return mergeObjects(target, ...sources);
};

const isObject = (item: any): boolean => {
	return item !== null && typeof item === "object";
};

const isMergebleObject = (item): boolean => {
	return isObject(item) && !Array.isArray(item);
};
