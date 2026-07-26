
const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  bgColor = "bg-blue-600",
  hoverColor = "hover:bg-blue-700",
  textColor = "text-white",
  className = "",
  icon: Icon = null,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md ${bgColor} ${hoverColor} ${textColor} ${className}`}
      {...props}
    >
      {Icon && <Icon size={25} className="mr-2 " />}
      {children}
    </button>
  );
};

export default PrimaryButton;
