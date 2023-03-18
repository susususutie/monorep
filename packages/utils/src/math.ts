/** [min, max] */
export function rangeClosed(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** TODO (min, max) */
export function rangeOpen(min: number, max: number) {
    return (
        rangeOpenClosed(min, (max - min) / 2 + min) + rangeClosedOpen(min, (max - min) / 2 + min)
    );
}

/** [min, max) */
export function rangeClosedOpen(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/** (min, max] */
export function rangeOpenClosed(min: number, max: number) {
    return Math.ceil(Math.random() * (max - min)) + min;
}

/** 计算众数 */
export function majorityNum(nums: number[]) {
    let count = 0;
    let majority = nums[0];

    for (let i = 0; i < nums.length; i++) {
        if (count === 0) {
            majority = nums[i];
        }

        if (majority === nums[i]) {
            count++;
        } else {
            count--;
        }
    }
    return majority;
}

/** 计算中位数 */
export function middleNum(numList: number[]) {
    const sort = [...numList].sort((a, b) => a - b);
    const length = sort.length;
    if (length % 2 === 0) {
        return (sort[length / 2 - 1] + sort[length / 2 + 1]) / 2;
    } else {
        return sort[(length - 1) / 2];
    }
}

/** 随机获取标准正态分布值 */
export function randomStandardNormalDistribution() {
    let u = 0,
        v = 0,
        w = 0,
        c = 0;
    do {
        //获得两个（-1,1）的独立随机变量
        u = Math.random() * 2 - 1;
        v = Math.random() * 2 - 1;
        w = u * u + v * v;
    } while (w == 0 || w >= 1);
    //这里就是 Box-Muller转换
    c = Math.sqrt((-2 * Math.log(w)) / w);
    //返回2个标准正态分布的随机数，封装进一个数组返回
    //当然，因为这个函数运行较快，也可以扔掉一个
    //return [u*c,v*c];
    return u * c;
}

/**
 * 获取正态分布数值
 * @param mean     均值
 * @param variance 方差
 */
export function normalDistribution(mean: number, variance: number) {
    return mean + randomStandardNormalDistribution() * variance;
}

/** 随机获取标准正态分布值(方法2) */
export function randomStandardNormalDistribution2() {
    let sum = 0.0;
    for (let i = 0; i < 12; i++) {
        sum = sum + Math.random();
    }
    return sum - 6.0;
}

/**
 * 获取正态分布数值(方法2)
 * @param mean     均值
 * @param variance 方差
 */
export function normalDistribution2(mean: number, variance: number) {
    return mean + randomStandardNormalDistribution2() * variance;
}
