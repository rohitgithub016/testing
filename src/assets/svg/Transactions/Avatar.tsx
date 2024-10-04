const Avatar = ({ color = "#54CB68" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="45"
      viewBox="0 0 44 45"
      fill="none"
    >
      <circle
        cx="22"
        cy="16.6604"
        r="5.5"
        fill="white"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle
        cx="22.0001"
        cy="22.1604"
        r="18.3333"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="22" cy="16.6604" r="5.5" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.8037 35.2325C32.2373 30.7684 30.0958 27.6604 22 27.6604C13.9042 27.6604 11.7627 30.7684 11.1963 35.2325C14.1301 37.66 17.8947 39.1187 22 39.1187C26.1053 39.1187 29.8699 37.66 32.8037 35.2325Z"
        fill="white"
      />
    </svg>
  );
};

export default Avatar;
