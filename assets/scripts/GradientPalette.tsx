import React, { useState, useRef, CSSProperties, FunctionComponent } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { IGradientConfiguration } from "./IGradientConfiguration";
import { IconButton, Tooltip } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";

interface IPropertyList
{
    size: number;
    configurationList: IGradientConfiguration[];
    onUpdated: (configurationList: IGradientConfiguration[]) => void;
}

const GradientPalette: FunctionComponent<IPropertyList> = ({ size, configurationList, onUpdated }) =>
{
    const [minimumConfigurationCount, maximumConfigurationCount] = [2, 7];
    const InvalidActiveIndex = -1;
    const [activeIndex, setActiveIndex] = useState<number>(InvalidActiveIndex);
    const [colorChangingIndex, setColorChangingIndex] = useState<number>(InvalidActiveIndex);
    const moved = useRef<boolean>(false);

    const onClick = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    {
        if (configurationList.length === maximumConfigurationCount)
        {
            return;
        }

        const ratio = (configurationList.length - 1) / configurationList.length;
        onUpdated
        (
            [
                ...configurationList.map((configuration) =>
                {
                    return {
                        red: configuration.red,
                        green: configuration.green,
                        blue: configuration.blue,
                        offset: configuration.offset * ratio,
                    };
                }),
                {
                    red: 0,
                    green: 0,
                    blue: 0,
                    offset: 1,
                },
            ]
        );
    };
    const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    {
        if (activeIndex === InvalidActiveIndex)
        {
            return;
        }

        moved.current = true;

        onUpdated
        (
            configurationList.map((configuration, index) =>
            {
                if (index !== activeIndex)
                {
                    return configuration;
                }
                
                const origin = (event.currentTarget as HTMLElement).getBoundingClientRect();
                const offset = (event.clientX - origin.left) / origin.width;
                return {
                    red: configuration.red,
                    green: configuration.green,
                    blue: configuration.blue,
                    offset: offset < 0 ? 0 : offset > 1 ? 1 : offset,
                };
            })
        );
    };
    const onMouseUp = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    {
        if (activeIndex === InvalidActiveIndex)
        {
            return;
        }

        if (!moved.current)
        {
                if (colorChangingIndex !== activeIndex)
            {
                setColorChangingIndex(activeIndex);
            }

            if (colorChangingIndex === activeIndex)
            {
                setColorChangingIndex(InvalidActiveIndex);
            }
        }

        moved.current = false;
        setActiveIndex(InvalidActiveIndex);
    };

    const configurationIcon = (configuration: IGradientConfiguration, index: number) =>
    {
        const onMouseDown = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        {
            moved.current = false;

            setActiveIndex(index);
        };
        const onMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        {
            (event.target as HTMLDivElement).style.cursor = "grab";
        };
        const onMouseOut = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        {
            (event.target as HTMLDivElement).style.cursor = "auto";
        };
        const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        {
            if (configurationList.length === minimumConfigurationCount)
            {
                return;
            }

            onUpdated
            (
                configurationList.filter((_, i) =>
                {
                    return i !== index;
                })
            );
        };

        const style: CSSProperties =
        {
            width: `${size}px`,
            height: `${size}px`,
            position: "absolute",
            left: `${configuration.offset * 100}%`,
            transform: "translateX(-50%)",
            borderRadius: "50%",
            backgroundColor: `rgb(${configuration.red}, ${configuration.green}, ${configuration.blue})`,
            borderWidth: "medium",
            borderStyle: "solid",
            borderColor: "rgba(64, 64, 64, 0.3)",
            boxSizing: "border-box",
        };

        return (
            <div style={style} key={index} onMouseDown={onMouseDown} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                <IconButton style={{ width: "100%", height: "100%", padding: "0px", position: "absolute", top: "120%" }} aria-label="remove color" key={index} onMouseDown={event => { event.stopPropagation(); }} onClick={onClick}>
                    <Close style={{ width: "100%", height: "100%", }}/>
                </IconButton>
            </div>
        );
    };
    
    return (
        <div style={{ width: "50%", height: "100%", position: "absolute", top: "50%", left: "50%", marginLeft: `${size}px`, marginRight: `${size}px`, transform: "translateX(-50%) translateY(-50%)", }} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            <div style={{ width: "100%", height: "5%", position: "absolute", top: "25%", transform: "translateY(-50%)", backgroundColor: "rgba(128, 128, 128, 0.5)", }}/>
            {
                configurationList.map((configuration, index) =>
                {
                    return configurationIcon(configuration, index);
                })
            }
            {
                colorChangingIndex !== InvalidActiveIndex &&
                <div style={{ position: "absolute", right: "0%", bottom: "-100%", transform: "translateX(50%) translateY(-50%)", }}>
                    <ChromePicker color={
                    {r: configurationList[colorChangingIndex].red, 
                    g: configurationList[colorChangingIndex].green,
                    b: configurationList[colorChangingIndex].blue}}
                    onChange={(color: ColorResult, _: React.ChangeEvent<HTMLInputElement>) =>
                    {
                        onUpdated
                        (
                            configurationList.map((configuration, index) =>
                            {
                                if (index !== colorChangingIndex)
                                {
                                    return configuration;
                                }

                                color.rgb
                                
                                return {
                                    red: color.rgb.r,
                                    green: color.rgb.g,
                                    blue: color.rgb.b,
                                    offset: configuration.offset,
                                };
                            })
                        );
                    }}/>
                </div>    
            }
            <Tooltip arrow={true} title="Add color" style={{ width: `${size}px`, height: `${size}px`, padding: "0px", position: "absolute", left: "100%", transform: "translateX(50%)"}}>
                <IconButton aria-label="add color" onClick={onClick}>
                    <Add style={{ width: "100%", height: "100%", }}/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export { GradientPalette }
