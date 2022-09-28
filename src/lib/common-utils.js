// 判断是否为空 返回true/false

const isBlank = function isBlank (data) {
    return data === null ||
        data === 'null' ||
        data === '' ||
        typeof data === 'undefined' ||
        data === 'undefined' ||
        data === 'unknown';
};

export default isBlank;
