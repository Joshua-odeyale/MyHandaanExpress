export default function FeatureItem({ icon: Icon, label }) {
  return (
    <li className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/40">
        <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="text-sm font-medium text-white/90">{label}</span>
    </li>
  );
}
