import { css } from 'styled-components';

export const sizes = {
    big: 71.25, //1140
    medium: 56.25, //900
    medium_2: 43.75, //700
    small: 34.375, //550
    tiny: 26.25, //420
    smallest: 21.875 //350
};

let media: any = {};

Object.keys(sizes).forEach((key) => {
	media[key] = (args: any) => css`@media only screen and (max-width: ${sizes[key]}em){
        ${css(args)}
    }`
});

export default media