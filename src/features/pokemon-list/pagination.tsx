interface PaginationProps {
  page: number;
  totalPages: number | null;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 hover:bg-zinc-50 dark:hover:bg-zinc-800"
      >
        prev
      </button>
      <span className="text-sm text-zinc-500">
        {page} / {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 hover:bg-zinc-50 dark:hover:bg-zinc-800"
      >
        next
      </button>
    </div>
  );
}
