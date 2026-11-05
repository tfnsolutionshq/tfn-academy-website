export function PageLoader() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
      <span className="spin" aria-label="Loading page" />
    </div>
  );
}
