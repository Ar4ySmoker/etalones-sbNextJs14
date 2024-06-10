interface ButtonProps {
    text: string;
}

const Title: React.FC<ButtonProps> = ({ text }) => {
    return(
        <>
        <div className="text-3xl font-bold text-center text-red-700 py-3 z-[1]">{text}</div>
        </>
    )
}

export default Title