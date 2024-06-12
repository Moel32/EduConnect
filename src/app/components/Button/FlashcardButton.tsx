type Props = {
    children: React.ReactNode;
    onClick: () => void;
};

const Button = ({ children, onClick }: Props) => (
    <button
        className="bg-[#9f50ac] select-none font-bold h-[36px] min-w-[80px] rounded-[8px] text-white text-sm px-3 py-1 mx-1"
        onClick={onClick}
    >
        {children}
    </button>
);

export default Button;
