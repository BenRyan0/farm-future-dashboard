// AddListing.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add_listing } from '../../store/Reducers/listingReducer';
import DatePicker from './DatePicker';

const AddListing = () => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    name: '',
    price: '',
    unit: '',
    category: '',
    quantity: '',
    DeliveryPickupOption: '',
    description: '',
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('price', formState.price);
    formData.append('unit', formState.unit);
    formData.append('category', formState.category);
    formData.append('quantity', formState.quantity);
    formData.append('DeliveryPickupOption', formState.DeliveryPickupOption);
    formData.append('description', formState.description);
    formData.append('startDate', dateRange.startDate.toISOString());
    formData.append('endDate', dateRange.endDate.toISOString());

    dispatch(add_listing(formData));
  };

  return (
    <div className='px-2 lg:px-7 pt-5 pb-[90px]'>
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <h1 className='font-semibold text-text_color text-base'>Add New Listing</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-text_color">
            <div className="flex flex-col w-full gap-3">
              <div className="w-full">
                <label htmlFor="name">Listing Name</label>
                <input
                  onChange={handleInputChange}
                  value={formState.name}
                  className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]'
                  type="text"
                  placeholder='Listing name'
                  name='name'
                  id='name'
                />
              </div>
              <div className="w-full flex flex-row justify-between gap-2">
                <div className="">
                  <label htmlFor="price">Listing Price</label>
                  <div className="flex flex-row items-center border-2 border-slate-700 rounded-md px-2 gap-1">
                    <span>&#8369;</span>
                    <input
                      onChange={handleInputChange}
                      value={formState.price}
                      className='w-full bg-transparent px-1 py-2 focus:border-accent outline-none bg-[#283046] text-[#d0d2d6]'
                      type="number"
                      placeholder='Listing price'
                      name='price'
                      id='price'
                      min='0'
                    />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="unit">Select Unit</label>
                  <select
                    id="unit"
                    name='unit'
                    onChange={handleInputChange}
                    value={formState.unit}
                    className="w-full bg-[#283046] px-4 py-2 focus:border-accent outline-none border-2 border-slate-700 rounded-md text-[#d0d2d6]"
                  >
                    <option value="">Select Unit</option>
                    <option value="t">Metric Ton (t)</option>
                    <option value="tn">Short Ton (tn)</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="lb">Pound (lb)</option>
                    <option value="mg">Milligram (mg)</option>
                    <option value="g">Gram (g)</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="category">Category</label>
                <input
                  onChange={handleInputChange}
                  value={formState.category}
                  className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]'
                  type="text"
                  placeholder='Category'
                  name='category'
                  id='category'
                />
              </div>
              <div className="w-full">
                <label htmlFor="quantity">Quantity</label>
                <input
                  onChange={handleInputChange}
                  value={formState.quantity}
                  className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]'
                  type="number"
                  placeholder='Quantity'
                  name='quantity'
                  id='quantity'
                  min='0'
                />
              </div>
              <div className="w-full">
                <label htmlFor="DeliveryPickupOption">Delivery Pickup Option</label>
                <select
                  id="DeliveryPickupOption"
                  name='DeliveryPickupOption'
                  onChange={handleInputChange}
                  value={formState.DeliveryPickupOption}
                  className="w-full bg-[#283046] px-4 py-2 focus:border-accent outline-none border-2 border-slate-700 rounded-md text-[#d0d2d6]"
                >
                  <option value="">Select Option</option>
                  <option value="seller">Seller Delivery</option>
                  <option value="trader">Trader Pickup</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="description">Description</label>
                <textarea
                  onChange={handleInputChange}
                  value={formState.description}
                  className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]'
                  placeholder='Description'
                  name='description'
                  id='description'
                ></textarea>
              </div>
              <div className="w-full">
                <label htmlFor="harvestDate">Harvest Date Range</label>
                <DatePicker date={dateRange} setDate={setDateRange} />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button type="submit" className='bg-accent py-2 px-5 rounded-md font-semibold hover:bg-accent/90'>Add Listing</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
