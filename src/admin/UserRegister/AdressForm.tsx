import axios from "axios";
import React, { useEffect, useState } from "react";

export interface IUserAddress {
  Country: string;
  City: string;
  Street: string;
  BuildingNumber: string;
  ApartmentNumber: string;
  PostalCode: string;
  PhoneNumber: string;
  Email: string;
  Options: string;
}
export default function AdressForm() {
  const [city, setCity] = useState<string>();
  const [street, setStreet] = useState<string>();
  const [addresses, setAddresses] = useState<IUserAddress[]>();
  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("try");
    try {
      await axios.post(
        "http://localhost:5030/api/users/adressAdd",
        {
          country: "Germany",
          city: "Berlin",
          street: "Main",
          buildingNumber: "10",
          apartmentNumber: "5",
          postalCode: "12345",
          phoneNumber: "123456789",
          email: "test@mail.com",
          options: "none",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getAddresses = async () => {
      try {
        console.log("try get adress");
        const token = localStorage.getItem("access_token"); // твой JWT
        const response = await axios.get(
          "http://localhost:5030/api/users/addessesGet",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setAddresses(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAddresses();
  }, []);

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-amber-500 flex flex-col p-10 gap-5"
    >
      AdressForm
      <input onChange={(e) => setCity(e.target.value)} type="text"></input>
      <input onChange={(e) => setStreet(e.target.value)} type="text"></input>
      <button type="submit">SEnd</button>

      <div className="bg-amber-500 p-10"> <ul>{addresses?.map((i)=>{
           return <li> {i.Country}</li>
      })}</ul></div>
    </form>
  );
}
