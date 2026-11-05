import { useToast } from '@/shared/context/ToastContext';
import { Icon } from '@/shared/components/ui/Icon';

export function ToastViewport() {
  const { toasts } = useToast();

  return (
    <div className="toasts" id="toasts" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast" role="status">
          <Icon name="circle-check" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
