"use client";
import React, { useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import music from "./music.globals.css";

export default function Music() {
  const ref = useRef(null);
  const [music, setMusic] = useState("");
  const url = "https://6579da3c1acd268f9afa4236.mockapi.io/post/music";

  const { data, isLoading } = useSWR(url);

  //   useEffect(() => {
  //     fetch("https://6579da3c1acd268f9afa4236.mockapi.io/post/music")
  //       .then((res) => res.json())
  //       .then((data) => setMusicData(data));
  //   }, []);

  const handleClick = async () => {
    const newMusic = {
      title: music,
    };
    ref.current.value = "";
    mutate(url, [...data, { ...newMusic, id: data?.length }], false);
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(newMusic),
      headers: {
        "Content-Type": "application/json",
      },
    });
    mutate(url);
  };

  const handleDelete = async (id) => {
    mutate(
      url,
      data.filter((music) => music.id !== id),
      false
    );
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      const data = await res.json();
      mutate(url);
      return data;
    }
  };

  return (
    <div className="mt-10 ml-10">
      <form >
        <label htmlFor="title">Input Music Title</label>
        <input
         id="title"
          ref={ref}
          onChange={(e) => setMusic(e.target.value)}
          type="text"
          name="title"
        />
        <br />
        <input type="reset" value="Reset" />
      </form>
      <button onDoubleClickCapture={handleClick}>Request Music</button>
      <h3>Display Music = {data?.length}</h3>
      {!data ? (
        <span className="loader mt-5 ml-8"></span>
      ) : (
        <table
          cellSpacing="0"
          cellPadding="0"
          border="1"
          width="300px"
          height="auto"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((music, index) => (
              <tr key={music.id}>
                <td>{index + 1}</td>
                <td>{music.title}</td>
                <td>
                  <button onClick={() => handleDelete(music?.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
