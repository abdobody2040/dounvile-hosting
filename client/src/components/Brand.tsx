import { Hexagon } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand" aria-label="Dounvile">
      <span className="brand-mark" aria-hidden="true">
        <Hexagon size={compact ? 17 : 20} strokeWidth={2.4} />
        <i />
      </span>
      {!compact && <span className="brand-name">Dounvile</span>}
    </div>
  );
}
