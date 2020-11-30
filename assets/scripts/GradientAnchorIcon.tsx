import React, { CSSProperties, FunctionComponent } from "react";
import { IGradientAnchor } from "./IGradientAnchor";

interface IPropertyList
{
    anchor: IGradientAnchor;
    direction: "start" | "end";
    onUpdated: (direction: "start" | "end") => void;
}

const GradientAnchorIcon : FunctionComponent<IPropertyList> = ({ anchor, direction, onUpdated }) =>
{
    const onMouseDown = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    {
        onUpdated(direction);
    };
    const onMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    {
        (event.target as HTMLDivElement).style.cursor = "pointer";
    };
    const onMouseOut = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    {
        (event.target as HTMLDivElement).style.cursor = "auto";
    };

    const inner = "#404040";
    const outer = "#DFDFDF";
    const size = 40;

    const style: CSSProperties =
    {
        width: `${size}px`,
        height: `${size}px`,
        position: "absolute",
        top: `${anchor.y}px`,
        left: `${anchor.x}px`,
        transform: "translateX(-50%) translateY(-50%)",
        borderRadius: "50%",
        backgroundColor: inner,
        borderWidth: "5%",
        borderStyle: "solid",
        borderColor: outer,
        boxSizing: "border-box",
    };

    return <div style={style} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onMouseDown={onMouseDown}/>;
};

export { GradientAnchorIcon }
