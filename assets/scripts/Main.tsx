import React, { useRef, useState, useEffect, FunctionComponent } from "react";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { IGradientDirection } from "./IGradientDirection";
import { IGradientConfiguration } from "./IGradientConfiguration";
import { GradientCanvas } from "./GradientCanvas";
import { GradientPalette } from "./GradientPalette";

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

    const initialConfigurationList =
    [
        {
            red: 0,
            green: 0,
            blue: 0,
            offset: 0,
        },
        {
            red: 255,
            green: 255,
            blue: 255,
            offset: 1,
        },
    ];
    const [configurationList, setConfigurationList] = useState<IGradientConfiguration[]>(initialConfigurationList);

    const canvas = useRef<HTMLCanvasElement>(null);
    useEffect(() =>
    {
        if (canvas.current === null)
        {
            return;
        }

        const context = canvas.current.getContext("2d");
        if (context === null)
        {
            return;
        }

        const gradient = context.createLinearGradient(direction.start.x, direction.start.y, direction.end.x, direction.end.y);

        configurationList.forEach(configuration =>
            {
                gradient.addColorStop(configuration.offset, `rgb(${configuration.red}, ${configuration.green}, ${configuration.blue})`);
            });
        
        context.fillStyle = gradient;
        
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    }, [direction, configurationList]);
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
                <GradientPalette size={footerHeight / 2} configurationList={configurationList} onUpdated={setConfigurationList}/>
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
