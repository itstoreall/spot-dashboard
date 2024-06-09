const UpdateIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      // width='96'
      // height='96'
      viewBox='0 0 24 24'
    >
      <g fill='none' stroke='black' strokeLinecap='round' strokeWidth='2'>
        <path
          strokeDasharray='2 4'
          strokeDashoffset='6'
          d='M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21'
        >
          <animate
            attributeName='stroke-dashoffset'
            dur='0.9s'
            repeatCount='indefinite'
            values='6;0'
          />
        </path>
        <path
          strokeDasharray='30'
          strokeDashoffset='30'
          d='M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3'
        >
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.15s'
            dur='0.45s'
            values='30;0'
          />
        </path>
        <path strokeDasharray='10' strokeDashoffset='10' d='M12 8v7.5'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.75s'
            dur='0.3s'
            values='10;0'
          />
        </path>
        <path
          strokeDasharray='6'
          strokeDashoffset='6'
          d='M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5'
        >
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='1.05s'
            dur='0.3s'
            values='6;0'
          />
        </path>
      </g>
    </svg>
  );
};

export default UpdateIcon;
