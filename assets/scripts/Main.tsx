import React, { FunctionComponent } from "react";

const Main : FunctionComponent = () =>
{
    const [width, height] = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    const [headerWidth, headerHeight] = [width, 60];
    const [footerWidth, footerHeight] = [width, 60];
    const [mainWidth, mainHeight] = [width, height - (headerHeight + footerHeight)];

    return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
            <header style ={{ width: `${headerWidth}px`, height: `${headerHeight}px`, position: "relative", }}>
                header
            </header>
            <main style={{ width: `${mainWidth}px`, height: `${mainHeight}px`, position: "relative", }}>
                content
            </main>
            <footer style ={{ width: `${footerWidth}px`, height: `${footerHeight}px`, position: "relative", }}>
                footer
            </footer>
        </div>
    );
}

export { Main }
