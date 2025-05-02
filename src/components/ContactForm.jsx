// Ejemplo en un componente React
function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await fetch('/backend/send_email.php', {
      method: 'POST',
      body: formData,
    });

    const text = await response.text();
    alert(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Mensaje" required />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default ContactForm;
