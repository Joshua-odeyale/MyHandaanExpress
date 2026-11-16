import { useState } from 'react';
import { Mail, User } from 'lucide-react';
import {
  isValid,
  validateEmail,
  validateName,
  validatePassword,
} from '../lib/validation';
import Button from './Button';
import Modal from './Modal';
import PasswordField from './PasswordField';
import TextField from './TextField';

function RegisterForm({ onRegister, onSignInInstead }) {
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      confirm:
        values.confirm !== values.password ? 'Passwords do not match' : '',
    };
    setErrors(nextErrors);
    if (!isValid(nextErrors)) return;

    setSubmitting(true);
    const result = await onRegister(values);
    setSubmitting(false);
    if (!result.ok) setErrors({ [result.field ?? 'email']: result.error });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <TextField
        label="Full name"
        icon={User}
        name="name"
        autoComplete="name"
        placeholder="Ada Okafor"
        value={values.name}
        onChange={update('name')}
        error={errors.name}
        data-autofocus=""
      />
      <TextField
        label="Email"
        icon={Mail}
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={update('email')}
        error={errors.email}
      />
      <PasswordField
        name="new-password"
        autoComplete="new-password"
        placeholder="At least 6 characters"
        value={values.password}
        onChange={update('password')}
        error={errors.password}
      />
      <PasswordField
        label="Confirm password"
        name="confirm-password"
        autoComplete="new-password"
        placeholder="Re-enter your password"
        value={values.confirm}
        onChange={update('confirm')}
        error={errors.confirm}
      />

      <Button type="submit" variant="gradient" size="lg" fullWidth disabled={submitting}>
        {submitting ? 'Creating account…' : 'Create account'}
      </Button>

      <p className="text-center text-sm text-white/60">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSignInInstead}
          className="rounded font-semibold text-brand transition duration-200 hover:text-brand-light hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default function RegisterModal({ open, onClose, onRegister, onSignInInstead }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create your account"
      description="Join Handaan Express and get your favourite meals delivered fast."
    >
      <RegisterForm onRegister={onRegister} onSignInInstead={onSignInInstead} />
    </Modal>
  );
}
