import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./wrapper/Backbutton";

const BankDetails = () => {
  const {id} = useParams()
  const [formData, setFormData] = useState({
    phone: "",
    country: "Germany",
    bank: "",
    iban: "",
    username: "",
    password: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const GermanyBanks = [
    "Deutsche Bank",
    "Commerzbank",
    "DZ Bank",
    "KfW Bank",
    "HypoVereinsbank",
    "Postbank",
    "N26",
    "ING-DiBa",
    "DKB",
    "Sparkasse",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async () => {
    const errors = {};
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.bank.trim()) errors.bank = "Bank is required";
    if (!formData.iban.trim()) errors.iban = "IBAN is required";
    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.password.trim()) errors.password = "Password is required";
    if (!formData.address.trim()) errors.address = "Address is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const request = await fetch(`http://localhost:3000/bank/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await request.json();
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
    <BackButton/>
    <div className="flex items-center justify-center w-full min-h-screen bg-[#f4f4f4] p-4">
    <div className="bg-white rounded-lg shadow-md w-full max-w-[700px] padding20">
      <h2 className="text-xl font-semibold mb-6">Connect Your Bank</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Phone number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="padding10 border rounded-md input-type"
          />
          {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="padding10 border rounded-md input-type"
          >
            <option value="Germany">Germany</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">Bank</label>
          <select
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            className="padding10 border rounded-md input-type"
          >
            <option value="">Select Bank</option>
            {GermanyBanks.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {formErrors.bank && <p className="text-red-500 text-sm">{formErrors.bank}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">IBAN number</label>
          <input
            type="text"
            name="iban"
            value={formData.iban}
            onChange={handleChange}
            placeholder="IBAN number"
            className="padding10 border rounded-md input-type"
          />
          {formErrors.iban && <p className="text-red-500 text-sm">{formErrors.iban}</p>}
        </div>
      </div>
      <div className="mt-[20px]">
        <label className="text-sm mb-1">Bank Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Bank username"
          className="padding10 border rounded-md w-full input-type"
        />
        {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
      </div>
      <div className="mt-[20px]">
        <label className="text-sm mb-1">Bank Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Bank Password"
          className="padding10 border rounded-md w-full input-type"
        />
        {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
      </div>
      <div className="mt-[20px]">
        <label className="text-sm mb-1">Full address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full address"
          className="padding10 border rounded-md w-full input-type"
        />
        {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
      </div>
      <p className="text-sm text-yellow-400">Note : it is going to take about 1 business day for your Bank Assets to show up</p>
      <button
        className="bg-green-300 text-white font-medium rounded-md  w-full padding10"
        onClick={handleSubmit}
      >
        + Bank
      </button>
    </div>
  </div></>
    
  );
};

export default BankDetails;
