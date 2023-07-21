import RegistrationForm from "../components/RegistrationForm";

function RegistrationPage() {
  document.title = "Register | SeBRUS";

  return (
    <div className="page">
      <RegistrationForm />
    </div>
  );
}

export default RegistrationPage;
