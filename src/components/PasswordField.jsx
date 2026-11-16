import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import TextField from './TextField';

/** Password input with a lock icon and a show/hide toggle. */
export default function PasswordField({ label = 'Password', tone = 'dark', ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      label={label}
      tone={tone}
      icon={Lock}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className={`grid size-9 place-items-center rounded-lg transition duration-200 ${
            tone === 'dark'
              ? 'text-white/50 hover:bg-white/10 hover:text-white'
              : 'text-neutral-500 hover:bg-neutral-100 hover:text-ink'
          }`}
        >
          {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      }
      {...props}
    />
  );
}
