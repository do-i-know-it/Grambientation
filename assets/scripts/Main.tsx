import React, { useRef, useState, FunctionComponent } from "react";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { IGradientDirection } from "./IGradientDirection";
import { GradientCanvas } from "./GradientCanvas";

const Main : FunctionComponent = () =>
{
    const [width, height] = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    const [headerWidth, headerHeight] = [width, 60];
    const [footerWidth, footerHeight] = [width, 60];
    const [mainWidth, mainHeight] = [width, height - (headerHeight + footerHeight)];

    const initialDirection =
    {
        start:
        {
            x: width / 4,
            y: height / 2,
        },
        end:
        {
            x: width * 3 / 4,
            y: height / 2,
        },
    };
    const [direction, setDirection] = useState<IGradientDirection>(initialDirection);

    const canvas = useRef<HTMLCanvasElement>(null);
    const onClick = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    {
        if (canvas.current === null)
        {
            return;
        }

        const extension = "png";
        const type = `image/png`;

        const link = document.createElement("a");
        link.href = canvas.current.toDataURL(type);

        const now = new Date();
        const year = now.getFullYear().toString().padStart(4, "0");
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const date = now.getDate().toString().padStart(2, "0");
        const hour = now.getHours().toString().padStart(2, "0");
        const min = now.getMinutes().toString().padStart(2, "0");
        link.download = `${year}_${month}_${date}_${hour}_${min}.${extension}`;

        link.click();
    };

    return (
        <div style={{ width: `${width}px`, height: `${height}px`, }}>
            <header style ={{ width: `${headerWidth}px`, height: `${headerHeight}px`, position: "relative", }}>
                <Typography component={"h1"} style={{ lineHeight: `${headerHeight}px`, fontSize: "2em", fontWeight: "bold", fontStyle: "italic", position: "absolute", top: "0px", left: "0px", margin: "0 10px", }}>
                    Grambientation
                </Typography>
            </header>
            <main style={{ width: `${mainWidth}px`, height: `${mainHeight}px`, position: "relative", }}>
                <canvas ref={canvas} width={mainWidth} height={mainHeight} style={{ position: "absolute", top: "0px", left: "0px", }}/>
                <GradientCanvas direction={direction} onUpdated={setDirection}/>
            </main>
            <footer style ={{ width: `${footerWidth}px`, height: `${footerHeight}px`, position: "relative", }}>
                <Tooltip arrow={true} title="Download image" style={{ position: "absolute", bottom: "0px", right: "0px", }}>
                    <IconButton aria-label="download image" onClick={onClick}>
                        <GetApp/>
                    </IconButton>
                </Tooltip>
            </footer>
        </div>
    );
}

export { Main }
