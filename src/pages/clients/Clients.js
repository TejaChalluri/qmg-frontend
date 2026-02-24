import "./Clients.css";

const Clients = () => {
  const clients = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`
  }));

  return (
    <div className="card-container">
      {clients.map((client) => (
        <div className="card" key={client.id}>
          <h3>{client.name}</h3>
          <p>Member ID: {client.id}</p>
        </div>
      ))}
    </div>
  );
};

export default Clients;
