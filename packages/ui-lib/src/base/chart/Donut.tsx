interface DonutProps {
  radius: number;
  stroke: number;
  progress: string;
  className: string;
  label: string | number;
}

export const Donut = (props: DonutProps) => {
  const normalizedRadius = props.radius - props.stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (parseInt(props.progress) / 100) * circumference;
  return (
    <svg height={props.radius * 2} width={props.radius * 2}>
      <circle
        className={`${props.className} origin-center -rotate-90`}
        stroke="white"
        fill="transparent"
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        strokeWidth={props.stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={props.radius}
        cy={props.radius}
      />
      <text
        className=" fill-white font-body"
        x={props.radius - 20}
        y={props.radius + 10}
        fontSize="30"
      >
        {props.label}
      </text>
    </svg>
  );
};
