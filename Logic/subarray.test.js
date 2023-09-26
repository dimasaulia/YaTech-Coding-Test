const { contiguousSubarrays } = require("./subarray");

// ADD NEW TEST CASE HERE
const test_list = [
    {
        input: {
            a: [2, 4, 7, 5, 3, 5, 8, 5, 1, 7],
            m: 4,
            k: 10,
        },
        output: 5,
        name: "Test 1",
    },
    {
        input: {
            a: [15, 8, 8, 2, 6, 4, 1, 7],
            m: 2,
            k: 8,
        },
        output: 2,
        name: "Test 2",
    },
];

for (let i = 0; i < test_list.length; i++) {
    test(`Running ${test_list[i].name}=>a:${test_list[i].input.a};m:${test_list[i].input.m},k:${test_list[i].input.k} should be ${test_list[i].output}`, () => {
        expect(
            contiguousSubarrays(
                (a = test_list[i].input.a),
                (m = test_list[i].input.m),
                (k = test_list[i].input.k)
            )
        ).toBe(test_list[i].output);
    });
}
