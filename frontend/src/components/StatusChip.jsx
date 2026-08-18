export const STATUS_LABEL = {
  submitted:    'NEW',
  acknowledged: 'ACKNOWLEDGED',
  in_progress:  'IN PROGRESS',
  resolved:     'RESOLVED',
  closed:       'CLOSED',
};

export const STATUS_CHIP = {
  submitted:    'status-new',
  acknowledged: 'status-dispatched',
  in_progress:  'status-dispatched',
  resolved:     'status-resolved',
  closed:       'status-resolved',
};

export const PRIORITY_OF_CATEGORY = {
  e_waste:      'High',
  construction: 'High',
  plastic:      'Medium',
  organic:      'Medium',
  other:        'Low',
};

export function StatusChip({ status, className = '' }) {
  const label = STATUS_LABEL[status] || status?.toUpperCase() || '—';
  return (
    <span className={`font-label-caps text-label-caps status-chip ${STATUS_CHIP[status] || 'status-resolved'} ${className}`}>
      {label}
    </span>
  );
}

export function PriorityDot({ priority }) {
  const tone =
    priority === 'High'
      ? 'bg-error text-error'
      : priority === 'Medium'
        ? 'bg-outline-variant text-on-surface'
        : 'bg-outline text-outline';
  return (
    <span className={`flex items-center gap-2 text-sm font-medium ${tone.split(' ')[1]}`}>
      <span className={`w-2 h-2 rounded-full ${tone.split(' ')[0]}`}></span>
      {priority}
    </span>
  );
}

export function relativeTime(iso) {
  if (!iso) return '—';
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString();
}