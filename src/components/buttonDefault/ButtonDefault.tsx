interface ButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
}

const  ButtonDefault = ({
  children,
  handleClick
}: ButtonProps) => {
  return (
    <button 
        onClick={handleClick}
      >
        <span>{children}</span>
      </button>
  )
}

export default ButtonDefault