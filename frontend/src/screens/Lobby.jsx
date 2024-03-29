import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="bg-white w-full rounded-lg shadow-lg py-8 px-6 mt-[400px]">
      <h1 className="text-3xl font-bold tracking-widest text-black mb-6">Consult a Doctor</h1>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmitForm}
      >
        <div className="flex flex-col">
          <label className="text-2xl text-gray-500" htmlFor="email">
            Email ID
          </label>
          <input
            className="py-2 text-2xl bg-gray-200 text-white px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="sanjeev@gmail.com"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-2xl text-gray-500" htmlFor="room">
            Room Number
          </label>
          <input
            className="py-2 text-2xl bg-gray-200 text-white px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter 123"
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button
          className="bg-indigo-500 text-2xl hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
          type="submit"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default LobbyScreen;