/* @flow */
'use strict';

import {parseValue} from '../CSS';

const NONE = 'none';
const EMPTY = [];

export const parseBoxShadow = (boxShadow: string): Array<BoxShadow> => {
    if (!boxShadow || boxShadow === NONE) {
        return EMPTY;
    }

    console.log(parseValue(boxShadow));
};
