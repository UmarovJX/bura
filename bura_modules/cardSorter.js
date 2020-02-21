const getGT = require('./cardGT');
module.exports = (koz, cards) => {
    const result = [...cards];
    const gt = getGT(koz);
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < result.len - 1; i++) {
            if (gt(result[i + 1], result[i])) {
                let tmp = result[i];
                result[i] = result[i + 1];
                result[i + 1] = tmp;
                swapped = true;
            }
        }
    } while (swapped);
    return result;
}