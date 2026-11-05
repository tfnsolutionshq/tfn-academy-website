import { Link } from 'react-router-dom';
import { Icon } from '@/shared/components/ui/Icon';

export default function NotFoundPage() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="empty">
          <h3>Page not found</h3>
          <p>The page you are looking for does not exist or has been moved.</p>
          <p style={{ marginTop: 18 }}>
            <Link className="btn btn-brand btn-sm" to="/">
              Back to home <Icon name="arrow-right" className="arr" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
