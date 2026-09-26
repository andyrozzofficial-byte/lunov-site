type Props = {
  pending?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  showEdit?: boolean;
  showSave?: boolean;
  showCancel?: boolean;
  showDelete?: boolean;
  className?: string;
};

export function CcActions({
  pending = false,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  showEdit = false,
  showSave = false,
  showCancel = false,
  showDelete = false,
  className = "",
}: Props) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {showEdit && onEdit && (
        <button
          type="button"
          onClick={onEdit}
          disabled={pending}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted ring-1 ring-border transition-colors hover:text-foreground disabled:opacity-40"
        >
          Redigera
        </button>
      )}
      {showSave && onSave && (
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="rounded-lg bg-lime px-3 py-1.5 text-xs font-semibold text-black disabled:opacity-40"
        >
          Spara
        </button>
      )}
      {showCancel && onCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={pending}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground disabled:opacity-40"
        >
          Avbryt
        </button>
      )}
      {showDelete && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          disabled={pending}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400/80 transition-colors hover:text-red-400 disabled:opacity-40"
        >
          Ta bort
        </button>
      )}
    </div>
  );
}
