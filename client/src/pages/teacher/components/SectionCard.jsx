export default function SectionCard({ title, action, actionLabel, onActionClick, icon, children }) {
  const clickHandler = typeof onActionClick === 'function' 
    ? onActionClick 
    : (typeof action === 'function' ? action : null);

  return (
    <div className="section-card">
      <div className="section-header">
        <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && icon}
          {title}
        </h3>
        {clickHandler && actionLabel ? (
          <button className="section-action" onClick={clickHandler}>{actionLabel}</button>
        ) : actionLabel ? (
          <span className="section-action">{actionLabel}</span>
        ) : typeof action !== 'function' ? (
          action
        ) : null}
      </div>
      {children}
    </div>
  );
}

