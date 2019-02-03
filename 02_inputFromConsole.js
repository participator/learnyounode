const getInputs = () => sum(process.argv.slice(2));

const sum = (nums) => {
    return nums.reduce((prev, curr) => {
        const sum = parseInt(prev);
        let current = parseInt(curr);

        if (Number.isNaN(sum) || Number.isNaN(current)) current = 0;

        return sum + current;
    });
};

console.log(getInputs());