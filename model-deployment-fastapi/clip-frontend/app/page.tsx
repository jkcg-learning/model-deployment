"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [image, setImage] = useState("");
  const [textInput, setTextInput] = useState("");

  // useEffect(() => {}, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="text"
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
        className="text-black"
      />
      <button
        onClick={() => {
          fetch(
            `https://CLIPLoadBalancer-1374475107.us-east-1.elb.amazonaws.com/text-to-image?text=${textInput}`,
            {
              method: "get",
              redirect: "follow",
            }
          )
            .then((response) => response.blob())
            .then((result) => {
              setImage(URL.createObjectURL(result));
            })
            .catch((error) => console.log("error", error));
        }}
      >
        submit
      </button>
      {image && (
        <img src={image} alt="Nearest Image" className="w-full h-full" />
      )}
    </main>
  );
}