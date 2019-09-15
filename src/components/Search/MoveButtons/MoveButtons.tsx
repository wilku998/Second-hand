import React from "react";
import style, { MoveIcon, MoveButton } from "./styleMoveButtons";

export interface IProps {
  className?: string;
  page: number;
  pages: number;
  pageButtons: number[];
  onMoveButtonClick: any;
}

const MoveButtons = ({
  className,
  page,
  pages,
  pageButtons,
  onMoveButtonClick
}: IProps) => (
  <div className={className}>
    <MoveButton
      disabled={page === 1}
      data-goto={page - 1}
      onClick={onMoveButtonClick}
    >
      <MoveIcon src="/svg/left.svg" />
    </MoveButton>
    {pageButtons.map(e => (
      <MoveButton
        data-goto={e}
        onClick={onMoveButtonClick}
        disabled={e === page}
        isselected={(e === page).toString()}
        key={e}
      >
        {e}
      </MoveButton>
    ))}
    <MoveButton
      disabled={page === pages}
      data-goto={page + 1}
      onClick={onMoveButtonClick}
    >
      <MoveIcon isright={"true"} src="/svg/left.svg" />
    </MoveButton>
  </div>
);

export default style(MoveButtons);
