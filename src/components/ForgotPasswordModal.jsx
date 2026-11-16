import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Mail, MailCheck } from 'lucide-react';
import { validateEmail } from '../lib/validation';
import Button from './Button';
import Modal from './Modal';
import TextField from './TextField';

function ForgotPasswordForm({ onBackToSignIn }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextError = validateEmail(email);
    setError(nextError);
    if (nextError) return;

    // No backend is connected yet: this is where the app should call the
    // password-reset endpoint. The delay stands in for the network request.
    setStatus('sending');
    timer.current = setTimeout(() => setStatus('sent'), 700);
  };

  if (status === 'sent') {
    return (
      <div className="text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/40">
          <MailCheck size={28} aria-hidden="true" />
        </span>
        <p role="status" className="mt-5 text-sm leading-relaxed text-white/75">
          If an account exists for{' '}
          <span className="font-semibold break-all text-white">{email.trim()}</span>, a link to
          reset your password is on its way. It may take a few minutes to arrive.
        </p>
        <Button
          variant="gradient"
          size="lg"
          fullWidth
          className="mt-7"
          onClick={onBackToSignIn}
          data-autofocus=""
        >
          Back to sign in
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <TextField
        label="Email"
        icon={Mail}
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (error) setError('');
        }}
        error={error}
        data-autofocus=""
      />
      <Button
        type="submit"
        variant="gradient"
        size="lg"
        fullWidth
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending link…' : 'Send reset link'}
      </Button>
      <button
        type="button"
        onClick={onBackToSignIn}
        className="mx-auto flex items-center gap-2 rounded text-sm font-medium text-white/70 transition duration-200 hover:text-white"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to sign in
      </button>
    </form>
  );
}

export default function ForgotPasswordModal({ open, onClose, onBackToSignIn }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Forgot password?"
      description="Enter the email you registered with and we'll send you a link to reset your password."
    >
      <ForgotPasswordForm onBackToSignIn={onBackToSignIn} />
    </Modal>
  );
}
