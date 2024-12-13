import "../assets/styles/main.scss";

const LogoLoading = () => {
  return (
    <div className="gt-container">
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <path
          d="
            M140,90 
            C140,40 60,40 60,100 
            C60,160 140,160 140,110
            L110,110
            L165,110
            L140,110
            L140,170"
          fill="none"
          stroke="#077712"
          stroke-width="4"
          stroke-dasharray="500"
          stroke-dashoffset="500"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="500"
            to="0"
            // dur="2.5s"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <h1>CGT</h1>
    </div>
  );
};

export default LogoLoading;
