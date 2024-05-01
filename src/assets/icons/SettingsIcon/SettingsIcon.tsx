const SettingsIcon = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='96'
      height='96'
      viewBox='0 0 24 24'
    >
      <g
        fill={color}
        fillOpacity='0'
        stroke={color}
        strokeDasharray='10'
        strokeDashoffset='10'
        strokeLinecap='round'
      >
        <g>
          <circle cx='5' cy='5' r='1.5' />
          <circle cx='12' cy='5' r='1.5' />
          <circle cx='19' cy='5' r='1.5' />
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            dur='0.3s'
            values='10;0'
          />
          <animate
            fill='freeze'
            attributeName='fill-opacity'
            begin='1.2s'
            dur='0.75s'
            values='0;1'
          />
        </g>
        <g>
          <circle cx='5' cy='12' r='1.5' />
          <circle cx='12' cy='12' r='1.5' />
          <circle cx='19' cy='12' r='1.5' />
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.6s'
            dur='0.3s'
            values='10;0'
          />
          <animate
            fill='freeze'
            attributeName='fill-opacity'
            begin='1.5s'
            dur='0.75s'
            values='0;1'
          />
        </g>
        <g>
          <circle cx='5' cy='19' r='1.5' />
          <circle cx='12' cy='19' r='1.5' />
          <circle cx='19' cy='19' r='1.5' />
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.9s'
            dur='0.3s'
            values='10;0'
          />
          <animate
            fill='freeze'
            attributeName='fill-opacity'
            begin='1.8s'
            dur='0.75s'
            values='0;1'
          />
        </g>
      </g>
    </svg>
  );
};

export default SettingsIcon;
