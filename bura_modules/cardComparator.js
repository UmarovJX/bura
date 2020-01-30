module.exports = koz => (a, b) => {
    const q = [6, 7, 8, 9, "J", "Q", "K", 10, "A"];

    if (a[1] === koz[1]) {
        if (b[1] === koz[1]) return q.indexOf(b[0]) - q.indexOf(a[0]);
        else return -1;
    }
    else {
        if (b[1] === koz[1]) { return 1 }
        else return q.indexOf(b[0]) - q.indexOf(a[0]);
    }
}