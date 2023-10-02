import { CartItemContainer, ItemDetais } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	return (
		<CartItemContainer>
			<img src={imageUrl} alt={`${name}`} />
			<ItemDetais>
				<span className="name">{name}</span>
				<span className="price">
					{quantity} x ${price}
				</span>
			</ItemDetais>
		</CartItemContainer>
	);
};

export default CartItem;
