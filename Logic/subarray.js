/**
 * Given an array of integers a ,
 * This function use to find how many of its contiguous subarrays of length m,
 * Contain a pair of integers with a sum equal to k.
 * @param {Array} a - The input array of integers.
 * @param {Number} m - The length of contiguous subarrays to consider.
 * @param {Number} k - The target sum to compare with subarray sums.
 * @returns {Number} - The count of contiguous subarrays meeting the criteria.
 */
function contiguousSubarrays(a, m, k) {
    let sum_k = 0;

    for (let i = 0; i < a.length; i++) {
        if (i + m >= a.length + 1) continue;

        let isFindcontiguous = false;
        const subarray = a.slice(i, i + m);

        for (let j = 0; j < subarray.length; j++) {
            for (let l = j + 1; l < subarray.length; l++) {
                if (isFindcontiguous) continue;
                if (subarray[j] + subarray[l] == k) {
                    sum_k += 1;
                    isFindcontiguous = true;
                    // console.log(
                    //     `[${subarray}] ==> ${subarray[j]} + ${subarray[l]} = ${
                    //         subarray[j] + subarray[l]
                    //     }`
                    // );
                }
            }
        }
    }
    return sum_k;
}

module.exports = { contiguousSubarrays };
