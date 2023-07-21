import LoginForm from "../components/LoginForm";

function LoginPage() {
  document.title = "Login | SeBRUS";

  return (
    <div className="page">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
