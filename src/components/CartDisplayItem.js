export default function CartDisplayItem({
  id = -1,
  name = "",
  price = 0,
  quantity = 0,
  increaseAction,
  decreaseAction,
  adjustAction,
  deleteAction
}) {
  return (
    <li key={id} className="list-group-item">
      <div>{name}</div>
      <div className="d-flex align-items-center">
        <div>Quantity:</div>
        <button onClick={decreaseAction} className="btn btn-secondary mx-2">
          {" "}
          -{" "}
        </button>{" "}
        {/* Decrease quantity button */}
        <input
          type="text"
          value={quantity}
          className="form-control text-center"
          style={{ width: "60px" }}
          onChange={adjustAction}
        />{" "}
        {/* Quantity textbox */}
        <button onClick={increaseAction} className="btn btn-secondary mx-2">
          {" "}
          +{" "}
        </button>{" "}
        {/* Increase quantity button */}
      </div>
      <div>Unit Price: ${price}</div>
      <div>
        <b>Subtotal: ${price * quantity}</b>
      </div>
      <button onClick={deleteAction} className="btn btn-danger mt-3">
        Delete
      </button>{" "}
      {/* Delete button */}
    </li>
  );
}
