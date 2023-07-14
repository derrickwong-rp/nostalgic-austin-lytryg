export default function ProductItem({
  id = -1,
  name = "",
  price = 0,
  clickAction
}) {
  return (
    <div key={id} className="list-group-item">
      <div>{name}</div>
      <div>${price}</div>
      <button onClick={clickAction} className="btn btn-primary">
        Add to Cart
      </button>
    </div>
  );
}
