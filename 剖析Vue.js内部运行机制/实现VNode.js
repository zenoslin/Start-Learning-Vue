class VNode {
    constructor (tag, data, children, text, elm) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
    }
}

function createEmptyVNode() {
    const node = new VNode()
    node.test = '';
    return node;
}

function creatTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val))
}

function cloneVNode(node) {
    const clone = new VNode(
        node.tag,
        node.data,
        node.children,
        node.text,
        node.elm
    )
    return clone
}