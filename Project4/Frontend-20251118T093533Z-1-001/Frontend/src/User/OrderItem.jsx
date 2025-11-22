import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../Seller/List.css';
import Unavbar from './Unavbar';

function OrderItem() {
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    flatno: '',
    city: '',
    pincode: '',
    state: '',
  });
  const [loading, setLoading] = useState(true);

  const deliveryFee = 99;
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch item data
  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/item/${id}`, { withCredentials: true })
      .then((resp) => {
        setItem(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch item data:', error);
        alert('Failed to load item data');
        navigate('/');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item) {
      alert('Item data is not loaded yet');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    try {
      // Validate essential item fields
      const { title, author, genre, itemImage, price } = item;
      if (!title || !author || !genre || !itemImage || !price) {
        throw new Error('Item data is incomplete');
      }

      const totalAmount = parseInt(price, 10) + deliveryFee;

      const currentDate = new Date();
      const deliveryDate = new Date();
      deliveryDate.setDate(currentDate.getDate() + 5);

      const orderData = {
        flatno: formData.flatno,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        totalamount: totalAmount,
        sellerId: item.sellerId || '',
        BookingDate: currentDate.toISOString().split('T')[0],
        description: item.description || '',
        Delivery: deliveryDate.toISOString().split('T')[0],
        userId: user.id,
        userName: user.name,
        booktitle: title,
        bookauthor: author,
        bookgenre: genre,
        itemImage,
      };

      console.log('Placing order:', orderData);

      await axios.post('http://localhost:4000/user/userorder', orderData, { withCredentials: true });
      alert('Order placed successfully!');
      navigate('/myorders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert(error.message || 'Failed to place order');
    }
  };

  if (loading) {
    return <p className="text-center mt-20 text-lg">Loading item details...</p>;
  }

  return (
    <div className="min-h-screen bg-[#fefae0] text-[#5e503f] font-serif">
      <Unavbar />
      <div className="flex justify-center px-4 py-4">
        <div className="w-full max-w-lg bg-[#fff8dc] border border-[#e6ccb2] rounded-xl shadow-md p-4">
          <h2 className="text-3xl text-center font-bold mb-6">Your Order is Almost Done!</h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium mb-1">Flat No / Street:</label>
                <input
                  type="text"
                  name="flatno"
                  value={formData.flatno}
                  onChange={handleChange}
                  placeholder="Flat No"
                  required
                  className="w-full p-2 border border-[#e0c097] rounded bg-[#fffef6] focus:outline-none focus:ring-2 focus:ring-[#b08968]"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-lg font-medium mb-1">City:</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="w-full p-2 border border-[#e0c097] rounded bg-[#fffef6] focus:outline-none focus:ring-2 focus:ring-[#b08968]"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-lg font-medium mb-1">Pincode:</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                    className="w-full p-2 border border-[#e0c097] rounded bg-[#fffef6] focus:outline-none focus:ring-2 focus:ring-[#b08968]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-1">State:</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                  className="w-full p-2 border border-[#e0c097] rounded bg-[#fffef6] focus:outline-none focus:ring-2 focus:ring-[#b08968]"
                />
              </div>
            </div>

            {item && (
              <div className="mt-8 border-t border-[#d6bfa6] pt-6 space-y-4">
                <div className="flex justify-center">
                  <img
                    src={`http://localhost:4000/${item.itemImage}`}
                    alt={item.title}
                    className="h-28 rounded-md shadow-sm border border-[#e0c097] bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-lg">
                    <span>Price:</span>
                    <span>₹{item.price}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Delivery Fee:</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>₹{parseInt(item.price, 10) + deliveryFee}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="mt-8 w-full bg-[#b08968] hover:bg-[#7f5539] text-white py-3 rounded-lg font-semibold transition duration-200"
              disabled={!item}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
