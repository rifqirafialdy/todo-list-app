import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

function TodoItem(props) {
  const { item, deleteBtnHandler,completeHandler } = props;
  return (
    <div class="flex border-2 border-black px-2 py-1 rounded w-80 justify-between ">
      <p className={item.done ? " line-through opacity-50" : "text-black opacity"}>{item.activity}</p>
      <div >

        <button onClick={() => completeHandler(item.id)}
          className="hover:text-green-400"
         > <DoneIcon /></button>
      <button
          onClick={() => deleteBtnHandler(item.id)}
          className="hover:text-red-300"
        >
        <DeleteIcon/>
      </button>
        </div>
    </div>
  );
}

export default TodoItem;
