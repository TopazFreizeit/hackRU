import { useState } from "react";

function MyForm() {
  const [name, setName] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert(`Submitting name: ${name}`);
    // Do something with the name, like send it to a server
  }

  const nameForm = (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} />
      </label>
      <button type="submit" className="btn mt-5">
        {name ? `Submit ${name}` : "Submit"}
      </button>
    </form>
  );

  return (
    <div>
      <h1>My Form</h1>
      {nameForm}
    </div>
  );
}
