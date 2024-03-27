interface ToolbarMenuProps {
  menuName: "редкие" | "частые" | "Знаю!" | "Учу!" | "без ответа";
  menuId: "practiceCount" | "result";
  children: React.ReactElement;
}

const ToolbarMenu = ({ menuName, menuId, children }: ToolbarMenuProps) => {
  return (
    <div>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls={menuId}
        tabIndex={-1}
      >{`Сначала ${menuName}`}</button>
      <menu id={menuId}>

        {children}

      </menu>
    </div>
  )
}

export default ToolbarMenu