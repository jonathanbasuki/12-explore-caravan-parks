const { DOMParser } = require("xmldom");

// Convert XML list to JSON
function parseXmlList(xmlText, config = { root: "resultset", itemTag: "result" }) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const root = xmlDoc.getElementsByTagName(config.root)[0];

    if (!root) throw new Error(`Root element <${config.root}> not found`);

    const items = Array.from(root.getElementsByTagName(config.itemTag)).map(el => {
        const obj = {};
        Array.from(el.attributes).forEach(attr => {
            obj[attr.name] = attr.value;
        });
        return obj;
    });

    const result = {
        items,
    };

    Array.from(root.attributes).forEach(attr => {
        result[attr.name] = attr.value;
    });

    return result;
}

// Convert XML attribute to JSON
function parseXmlAttr(xmlText, config = { root: "detailDescription" }) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const root = xmlDoc.getElementsByTagName(config.root)[0];

    if (!root) throw new Error(`Root element <${config.root}> not found`);

    const detail = {};

    // Main attribute
    Array.from(root.attributes).forEach(attr => {
        detail[attr.name] = attr.value;
    });

    // Children attribute
    Array.from(root.childNodes).forEach(node => {
        if (node.nodeType !== 1) return;

        const tag = node.tagName;
        const childObj = {};

        Array.from(node.attributes).forEach(attr => {
            childObj[attr.name] = attr.value;
        });

        if (!detail[tag]) {
            detail[tag] = [];
        }

        detail[tag].push(childObj);
    });

    return detail;
}

module.exports = {
    parseXmlList,
    parseXmlAttr
};