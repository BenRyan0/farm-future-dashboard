import React, { useState } from "react";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return (
    <>
      <button
        onClick={toggleModal}
        className="px-4 py-2 block mx-auto mt-24 text-lg bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open
      </button>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            onClick={toggleModal}
            className="absolute inset-0 bg-gray-800 bg-opacity-80"
          ></div>
          <div className="relative z-10 bg-gray-100 p-6 rounded shadow-md max-w-md w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Hello Modal</h2>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
            </p>
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
