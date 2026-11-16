import LoginForm from './LoginForm';
import Modal from './Modal';

export default function LoginModal({ open, onClose, onSignIn, onRegister, onForgotPassword }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Welcome back!"
      description="Sign in to your Handaan Express account"
    >
      <LoginForm
        autoFocus
        onSignIn={onSignIn}
        onRegister={onRegister}
        onForgotPassword={onForgotPassword}
      />
    </Modal>
  );
}
