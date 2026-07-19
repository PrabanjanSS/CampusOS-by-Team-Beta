import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
}

export function Table<T extends Record<string, unknown>>({ columns, data, rowKey, onRowClick }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-soft bg-white shadow-card">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border-soft bg-cream-100/50">
            {columns.map((col) => (
              <th key={String(col.key)} className={cn('px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-ink-soft', col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <motion.tr
              key={rowKey(row)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'border-b border-border-soft/60 transition-colors last:border-0',
                onRowClick && 'cursor-pointer hover:bg-cream-100/60'
              )}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className={cn('px-5 py-4 text-ink', col.className)}>
                  {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
