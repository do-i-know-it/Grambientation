import React, { useRef, FunctionComponent } from "react";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";

const Main : FunctionComponent = () =>
{
    const [width, height] = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    const [headerWidth, headerHeight] = [width, 60];
    const [footerWidth, footerHeight] = [width, 60];
    const [mainWidth, mainHeight] = [width, height - (headerHeight + footerHeight)];

    return (
        <div style={{ width: `${width}px`, height: `${height}px`, }}>
            <header style ={{ width: `${headerWidth}px`, height: `${headerHeight}px`, position: "relative", }}>
                <Typography component={"h1"} style={{ lineHeight: `${headerHeight}px`, fontSize: "2em", fontWeight: "bold", fontStyle: "italic", position: "absolute", top: "0px", left: "0px", margin: "0 10px", }}>
                    Grambientation
                </Typography>
            </header>
            <main style={{ width: `${mainWidth}px`, height: `${mainHeight}px`, position: "relative", }}>
                content
            </main>
            <footer style ={{ width: `${footerWidth}px`, height: `${footerHeight}px`, position: "relative", }}>
                <Tooltip arrow={true} title="Download image" style={{ position: "absolute", bottom: "0px", right: "0px", }}>
                    <IconButton aria-label="download image">
                        <GetApp/>
                    </IconButton>
                </Tooltip>
            </footer>
        </div>
    );
}

export { Main }
