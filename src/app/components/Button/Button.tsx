type Props = {
    text: string;
    onClick: () => void;
};

const Button = ({text, onClick}: Props) => (
    <button
    className='bg-[#9f50ac] select-none font-bold h-[45px] min-w-[120px] rounded-[10px] text-white'
    onClick={onClick}
    >
        {text}
    </button>
);

export default Button;