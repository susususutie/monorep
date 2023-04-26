// https://github.com/vitejs/vite/issues/1197
// https://stackoverflow.com/a/71078699/21480286
export const svg2src = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${svg.replaceAll("#", "%23")}`;

export const arrow =
  svg2src(`<svg width="9px" height="9px" viewBox="0 0 9 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<title>直线</title>
<g id="文件同步" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <polygon id="直线" fill="#E6E9F0" fill-rule="nonzero" points="9 4.5 4.54747351e-13 0 4.54747351e-13 9"></polygon>
</g>
</svg>`);

export const point =
  svg2src(`<svg width="99px" height="4px" viewBox="0 0 99 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<title>编组</title>
<defs>
    <linearGradient x1="79.2294681%" y1="50%" x2="10.5488273%" y2="50%" id="linearGradient-1">
        <stop stop-color="#3385FF" offset="0%"></stop>
        <stop stop-color="#3385FF" stop-opacity="0" offset="100%"></stop>
    </linearGradient>
</defs>
<g id="文件同步" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="切图" transform="translate(-400.000000, -205.000000)">
        <g id="编组" transform="translate(400.000000, 205.000000)">
            <rect id="矩形" x="0" y="0" width="98" height="4"></rect>
            <g id="编组-24" transform="translate(69.500000, 0.000000)">
                <path d="M26.3100398,4 C27.5476201,4 28.5508772,3.1045695 28.5508772,2 C28.5508772,0.8954305 27.5476201,0 26.3100398,0 C25.4849863,0 23.5652654,0.666666667 20.5508772,2 C23.5652654,3.33333333 25.4849863,4 26.3100398,4 Z" id="椭圆形" fill="#3385FF"></path>
                <polygon id="直线-2" fill="url(#linearGradient-1)" fill-rule="nonzero" points="24.5095971 1.5 24.5095971 2.5 0 2.5 0 1.5"></polygon>
            </g>
        </g>
    </g>
</g>
</svg>`);
