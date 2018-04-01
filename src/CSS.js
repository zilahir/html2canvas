/* @flow */
import Color from './Color';
('use strict');

const whitespace = /^\s$/;

export const parseValue = (value: string, functionHandlers) => {
    const length = value.length;
    let openQuote = false;
    let str = '';
    let args = [];
    const values = [];
    const functions = [];

    for (let i = 0; i < length; i++) {
        const char = value[i];

        if (char === '"') {
            openQuote = !openQuote;
        } else if (!openQuote) {
            if (char === '(') {
                functions.push({
                    method: str,
                    args: []
                });
                str = '';
            } else if (char === ')') {
                const func = functions.pop();
                if (str.length) {
                    func.args.push(str);
                    str = '';
                }
                const parent = functions.length ? functions[functions.length - 1].args : args;
                parent.push(func);
            } else if (char === ',') {
                if (functions.length) {
                    functions[functions.length - 1].args.push(str);
                    str = '';
                } else {
                    if (str.length) {
                        args.push(str);
                        str = '';
                    }
                    values.push(args);
                    args = [];
                }
            } else {
                if (whitespace.test(char)) {
                    if (str.length) {
                        args.push(str);
                        str = '';
                    }
                } else {
                    str += char;
                }
            }
        } else {
            str += char;
        }
    }

    if (str.length) {
        args.push(str);
    }

    if (args.length) {
        values.push(args);
    }

    return values;
};

export const defaultFunctions = {
    rgb: (...args) => {
        return new Color(args.map(a => parseInt(a, 10)).concat(null));
    },
    rgba: (...args) => {
        return new Color(args.map(a => parseInt(a, 10)));
    }
};
