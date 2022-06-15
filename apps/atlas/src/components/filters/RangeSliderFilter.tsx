import * as SliderPrimitive from '@radix-ui/react-slider';
import React from 'react';
interface RangeSliderFilterProps {
  name: string;
  min: number;
  max: number;
  values?: number[];
  defaultValues: number[];
  onChange(values: number[]): void;
  stepSize?: number;
  className?: string;
}

export const RangeSliderFilter = React.forwardRef<any, RangeSliderFilterProps>(
  (props, forwardedRef) => {
    const value = props.values || props.defaultValues;

    const valueDisplay = `${value[0]}-${value[1]}`;

    return (
      <div className={props.className || 'mb-3'}>
        <div className="flex justify-between w-full">
          <span>{props.name}</span> <span>{valueDisplay}</span>
        </div>
        <SliderPrimitive.Slider
          className="relative flex items-center w-full h-4 select-none"
          step={props.stepSize || 1}
          value={value}
          min={props.min}
          max={props.max}
          onValueChange={(vals) => props.onChange(vals)}
          ref={forwardedRef}
        >
          <SliderPrimitive.Track className="relative flex-1 h-1 bg-white rounded-full cursor-pointer">
            <SliderPrimitive.Range className="absolute h-full bg-yellow-700 rounded-full" />
          </SliderPrimitive.Track>
          {value.map((_, i) => (
            <SliderPrimitive.Thumb
              className="block w-4 h-4 bg-white rounded-full shadow-md cursor-move hover:bg-gray-300 shadow-black"
              key={i}
            />
          ))}
        </SliderPrimitive.Slider>
      </div>
    );
  }
);

RangeSliderFilter.displayName = 'RangeSliderFilter';
