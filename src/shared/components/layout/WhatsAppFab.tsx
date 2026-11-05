import { Icon } from '@/shared/components/ui/Icon';
import { WHATSAPP_SUPPORT_NUMBER } from '@/shared/constants/academyData';

export function WhatsAppFab() {
  const href = `https://wa.me/${WHATSAPP_SUPPORT_NUMBER}?text=${encodeURIComponent(
    'Hello TFN Academy, I would like to know more about your programmes.',
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with TFN Academy on WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] pl-4 pr-5.5 font-bold text-[#06301A] shadow-[0_10px_26px_rgba(37,211,102,0.45)] transition-transform hover:-translate-y-0.5"
    >
      <Icon name="message-circle" size={24} />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
