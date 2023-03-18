import * as TF from "./timingFunction";
import type { TimingFuntionNames } from "./timingFunction";

const enum STATE {
    NOTSTART = 0b00,
    STARED = 0b01,
    PAUSED = 0b10,
    END = 0b11,
}

type TransitionOpt = {
    from: number;
    to: number;
    duration: number;
    timingFunction: TimingFuntionNames | ((t: number) => number);
    update?: (value: number) => void;
    complete?: Function;
};

export function transition(option: TransitionOpt) {
    const { from, to, duration, timingFunction, update, complete } = option;
    const easeFunc = TF[timingFunction as TimingFuntionNames] || timingFunction;

    let timer: number;
    let lastTime: number;
    let state = STATE.NOTSTART;

    let progressValue = 0;
    let progressPercent = 0;
    function step() {
        const now = Date.now();

        progressValue = progressValue + (now - lastTime);
        progressPercent = progressValue / duration;
        lastTime = now;

        if (progressPercent >= 1) {
            typeof update === "function" && update(to);
            typeof complete === "function" && complete();

            cancelAnimationFrame(timer);
            state = STATE.END;
            progressValue = 0;
            progressPercent = 0;
        } else {
            const shouldPause =
                typeof update === "function"
                    ? update(from + (to - from) * easeFunc(progressPercent))
                    : false;

            if (shouldPause) {
                pause();
            } else {
                timer = requestAnimationFrame(step);
            }
        }
    }

    const pause = () => {
        if (state === STATE.PAUSED) return;

        cancelAnimationFrame(timer);
        state = STATE.PAUSED;
    };
    const start = () => {
        if (state === STATE.STARED) return;

        lastTime = Date.now();
        timer = requestAnimationFrame(step);
        state = STATE.STARED;
    };

    return {
        pause,
        start,
    };
}

/**
 * demo:
 */
// transition({
//     from: 0,
//     to: 1000,
//     duration: 100,
//     timingFunction: "linear",
//     update: (value) => {
//         console.log("update: ", value);
//     },
//     complete: () => {
//         console.log("complete");
//     },
// });
