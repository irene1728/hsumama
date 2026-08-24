"use client";

import { useState } from "react";

export function useCheckout() {
  const [customerName, setCustomerName] = useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");

  const [note, setNote] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState("新竹物流冷凍宅配");

  const [paymentMethod, setPaymentMethod] =
    useState("ATM轉帳/貨到付款");

  const [loading, setLoading] = useState(false);

  return {
    customerName,
    setCustomerName,

    phone,
    setPhone,

    email,
    setEmail,

    address,
    setAddress,

    note,
    setNote,

    deliveryMethod,
    setDeliveryMethod,

    paymentMethod,
    setPaymentMethod,

    loading,
    setLoading,
  };
}