export const filterBy = function(array, filters, text, compare)
{
    return array.filter(row => {
        if (!text) {
            return true;
        }
        for (let i = 0, l = filters.length; i < l; i++) {
            var filter = typeof filters[i] === "string" ? filters[i].trim() : false;
            if (filter && compareBy(row, filter.split('.'), text, compare)) {
                return true;
            }
        }
        return false;
    });
}
export const compareBy = function(item, filter, value, compare) {
    if (compare === undefined) {
        compare = findInText;
    }
    if (filter.length === 0) {
        return compare(item, value);
    }
    const att = filter.shift();
    if (att === '*' && item instanceof Array) {
        for (let i = 0, l = item.length; i < l; i++) {
            if (compareBy(item[i], filter, value, compare)) {
                return true;
            }

        }
    } else if (att === '*' && item instanceof Object) {
        for (let a in item) {
            if (!(item[a] instanceof Function) && compareBy(item[a], filter, value, compare)) {
                return true;
            }
        }
    } else if (item instanceof Object) {
        return compareBy(item[att], filter, value, compare);
    }
    return false;
}
export const findInText = function(text, search) {
    return String(text).localeIndexOf(search, 'en', {sensitivity: 'base'}) > -1;
}
