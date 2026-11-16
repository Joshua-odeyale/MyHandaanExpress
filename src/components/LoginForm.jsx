import { useState } from 'react';
import { Mail } from 'lucide-react';
import { isValid, validateEmail, validatePassword } from '../lib/validation';
import Button from './Button';
import PasswordField from './PasswordField';
import TextField from './TextField';

/**
 * Sign-in form shared by the hero card and the login modal.
 * `onSignIn` receives { email, password, remember } and must resolve to
 * { ok: true } or { ok: false, error }.
 */
export default function LoginForm({ onSignIn, onRegister, onForgotPassword, autoFocus = false }) {
  const [values, setValues] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (event) => {
    const value = field === 'remember' ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    };
    setErrors(nextErrors);
    setFormError('');
    if (!isValid(nextErrors)) return;

    setSubmitting(true);
    const result = await onSignIn(values);
    setSubmitting(false);
    if (!result.ok) setFormError(result.error);
  };

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
        value={values.email}
        onChange={update('email')}
        error={errors.email}
        data-autofocus={autoFocus ? '' : undefined}
      />
      <PasswordField
        name="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        value={values.password}
        onChange={update('password')}
        error={errors.password}
      />

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
        <label className="flex cursor-pointer items-center gap-2.5 text-white/75 select-none">
          <input
            type="checkbox"
            name="remember"
            checked={values.remember}
            onChange={update('remember')}
            className="size-4 cursor-pointer rounded accent-brand"
          />
          Remember me
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="rounded font-medium text-brand transition duration-200 hover:text-brand-light hover:underline"
        >
          Forgot password?
        </button>
      </div>

      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-300"
        >
          {formError}
        </p>
      )}

      <Button type="submit" variant="gradient" size="lg" fullWidth disabled={submitting}>
        {submitting ? 'Signing in…' : 'Sign in'}
      </Button>

      <p className="text-center text-sm text-white/60">
        Don&rsquo;t have an account?{' '}
        <button
          type="button"
          onClick={onRegister}
          className="rounded font-semibold text-brand transition duration-200 hover:text-brand-light hover:underline"
        >
          Register here
        </button>
      </p>
    </form>
  );
}
