"use client";
import React, { useRef, useState } from "react";
import useSWR, { mutate } from "swr";

export default function AddComponent() {
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
     console.log(isLoading)
    const newMusic = {
      title: music,
    };
    mutate(url, [...data,{...newMusic , id: data?.length}], false);
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(newMusic),
      headers: {
        "Content-Type": "application/json",
      },
    });
    ref.current.value = "";
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
      <form action="">
        <label htmlFor="title">Input Music Title</label>
        <input
          ref={ref}
          onChange={(e) => setMusic(e.target.value)}
          type="text"
          name="title"
        />
      </form>
      <button onClick={() => handleClick()}>Request Music</button>
      <h3>Display Music = {data?.length}</h3>
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
          {data?.map((music,index) => (
            <tr key={music.id}>
              <td>{index + 1}</td>
              <td>{music.title}</td>
              <td>
                <button onClick={() => handleDelete(music?.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
