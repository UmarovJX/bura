module.exports = koz => (a, b) => {
    const q = [6, 7, 8, 9, "J", "Q", "K", 10, "A"];

    if (a[1] === koz[1]) {
        if (b[1] === koz[1]) return q.indexOf(b[0]) < q.indexOf(a[0]);
        else return true;
    }
    else {
        if (b[1] === koz[1]) { return false }
        else {
            if (a[1] !== b[1]) return true;
            return q.indexOf(b[0]) < q.indexOf(a[0]);
        }
    }
}

