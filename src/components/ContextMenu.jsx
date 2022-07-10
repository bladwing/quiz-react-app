import React, { useEffect } from "react";
import "../style/contextMenu.scss"

export default function ContextMenu(props) {
  const handleDelete = () => {
    props.removeItem(props.id);
    props.showCallback(false);
  };

  useEffect(() => {
    const hideContextMenu = (e) => {
      if (!props.attemptItemRef.current?.contains(e.target) && props.show) {
        props.showCallback(false);
      }
    };
    window.addEventListener("click", hideContextMenu);
    return () => {
      window.removeEventListener("click", hideContextMenu);
    };
  });

  return (
    <div
      className="Context"
      style={{ top: props.locationStyles.y, left: props.locationStyles.x }}
    >
      <div className="delete-button" onClick={() => handleDelete()}>
        <span className="delete-text">წაშლა</span>
      </div>
    </div>
  );
};