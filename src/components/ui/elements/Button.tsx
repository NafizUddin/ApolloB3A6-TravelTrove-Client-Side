const Button = ({
  btnText,
  width,
  height,
}: {
  btnText: string;
  width: string;
  height: string;
}) => {
  return (
    <div>
      <button
        className={`group relative z-10 overflow-hidden bg-sky-700 text-lg text-white rounded-md font-semibold`}
        style={{ width, height }}
      >
        <span className="absolute -inset-10 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
        <span className="absolute -inset-10 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
        <span className="absolute -inset-10 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
        <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
          {btnText}
        </span>
        {btnText}
      </button>
    </div>
  );
};

export default Button;
