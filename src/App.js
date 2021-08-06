import React, { useState } from "react";
import TypeWriter from "./TypeWriter";
import "./styles.css";

export default function App() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("Welcome");
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Stoney");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmmju78tf/image/upload",
      {
        method: "POST"
      }
    );
    const file = await res.json();

    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <div className="App">
      <input
        type="file"
        name="file"
        placeholder="Upload an Image"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: "300px" }} />
      )}
      <button
        onClick={() => {
          setText("Let's Begin, shall we?");
        }}
      >
        Begin
      </button>
      <TypeWriter text={text} />
      <button
        onClick={() => {
          setText("My Name is Fern, do you want to play a game?");
        }}
      >
        We shall
      </button>
      <button
        className="button2"
        onClick={() => {
          setText("Well... I haven't made it that far yet. Too Bad :P");
        }}
      >
        Let's Play
      </button>
      <button
        onClick={() => {
          setText("Looks like you lose :P");
        }}
      >
        Unfair
      </button>
    </div>
  );
}
