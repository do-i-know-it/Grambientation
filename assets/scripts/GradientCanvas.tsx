import React, { useRef, FunctionComponent } from "react";
import { IGradientDirection } from "./IGradientDirection";
import { GradientAnchorIcon } from "./GradientAnchorIcon";

interface IPropertyList
{
    direction: IGradientDirection;
    onUpdated: (direction: IGradientDirection) => void;
}

const GradientCanvas : FunctionComponent<IPropertyList> = ({ direction, onUpdated }) =>
{
    const directionIndex = useRef<"none" | "start" | "end">("none");
    const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    {
        if (directionIndex.current === "none")
        {
            return;
        }

        const origin = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const offsetX = (event.clientX - origin.left);
        const offsetY = (event.clientY - origin.top);

        const nextDirection =
        {
            start: directionIndex.current !== "start" ? direction.start :
            {
                x: offsetX,
                y: offsetY,
            },
            end: directionIndex.current !== "end" ? direction.end :
            {
                x: offsetX,
                y: offsetY,
            },
        };

        onUpdated(nextDirection);
    };
    const onMouseUp = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    {
        directionIndex.current = "none";
    }

    return (
        <div style={{ width: "100%", height: "100%", position: "absolute", top: "0px", left: "0px", }} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            <GradientAnchorIcon anchor={direction.start} direction={"start"} onUpdated={direction => { directionIndex.current = direction; }}/>
            <GradientAnchorIcon anchor={direction.end} direction={"end"} onUpdated={direction => { directionIndex.current = direction; }}/>
        </div>
    );
};

export { GradientCanvas }
