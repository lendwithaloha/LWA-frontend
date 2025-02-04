"use client";

import { useRef, useEffect } from "react";
import StageHeader from "./stage-header";

interface Stage {
  name: string;
  count: number;
  amount: number;
}

interface StageSliderProps {
  stages: Stage[];
}

export default function StageSlider({ stages }: StageSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const onMouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mousemove", onMouseMove);

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="flex overflow-x-auto space-x-4 pb-4 cursor-grab active:cursor-grabbing "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {stages.map((stage) => (
        <StageHeader
          key={stage.name}
          stage={stage.name}
          count={stage.count}
          totalAmount={stage.amount}
        />
      ))}
    </div>
  );
}
