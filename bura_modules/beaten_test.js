function cmp(a, b) {
    let q = [6, 7, 8, 9, "J", "Q", "K", 10, "A"];
    if (a[1] === b[1]) {
        if (q.indexOf(a[0]) > q.indexOf(b[0])) return 1;
        return -1;
    } else {
        if (a[1] === koz[1]) return 1; else return -1;
    }
}

let koz = [7, 1];

function deckIsBeaten(cards, aim) {
    if (aim.length === 0) return true;
    cards.sort(cmp);
    aim.sort(cmp);
    let mybool = true;
    cards.forEach((element, index) => {
        if (cmp(element, aim[index]) < 0) { mybool = false; }
        console.log(element, index);
    });
    return mybool;
}

let arr1 = [[8, 2], [6, 2], [9, 2]];
let arr2 = [[7, 2], [10, 2], ["A", 2]];

deckIsBeaten(arr2, arr1);

arr1 = [[7, 2], [8, 2], [9, 2]];
arr2 = [[6, 2], [10, 2], ["K", 2]];