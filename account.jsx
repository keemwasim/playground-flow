/* the account contact sheet: three quiet structures, all made from the ruled
   section and row components so the grouped-list language stays one language. */

const ACCOUNT_ROWS = [
  { title: 'restore purchases' },
  { title: 'privacy' },
  { title: 'terms' },
  { title: 'sign out' },
];

function AccountRows({ rows, chevrons = true }) {
  const P = (window.PG || {});
  return rows.map((row, index) => (
    <P.ListRow
      key={row.title}
      title={row.title}
      chevron={chevrons}
      last={index === rows.length - 1}
      onClick={() => {}}
      style={{ padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)' }}
    />
  ));
}

function DeleteCard({ style, chevron = true }) {
  const P = (window.PG || {});
  return (
    <P.Section style={style}>
      <P.ListRow
        title="delete everything"
        chevron={chevron}
        onClick={() => {}}
        style={{ padding: 'var(--section-row-pad)', minHeight: 'var(--section-row-min)' }}
      />
    </P.Section>
  );
}

function GroupedList() {
  const P = (window.PG || {});
  return (
    <React.Fragment>
      <P.Section label="account">
        <AccountRows rows={ACCOUNT_ROWS} />
      </P.Section>
      <DeleteCard />
    </React.Fragment>
  );
}

function DestructiveSetApart() {
  const P = (window.PG || {});
  const groups = [
    { label: 'purchases', rows: ACCOUNT_ROWS.slice(0, 1) },
    { label: 'the papers', rows: ACCOUNT_ROWS.slice(1, 3) },
    { label: 'the door', rows: ACCOUNT_ROWS.slice(3) },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ font: 'var(--text-screen-title)', letterSpacing: 'var(--tracking-display)', color: 'var(--text-primary)', padding: 'var(--space-0) var(--space-1) var(--space-1)' }}>account</div>
      {groups.map((group) => (
        <P.Section key={group.label} label={group.label}>
          <AccountRows rows={group.rows} />
        </P.Section>
      ))}
      <DeleteCard style={{ marginTop: 'auto' }} />
    </div>
  );
}

function Minimal() {
  const P = (window.PG || {});
  return (
    <React.Fragment>
      <P.Section>
        <AccountRows rows={ACCOUNT_ROWS} chevrons={false} />
      </P.Section>
      <DeleteCard chevron={false} />
    </React.Fragment>
  );
}

function Phone({ caption, children, screenStyle }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '320px' }}>
      <div style={{ font: 'var(--text-hint)', color: 'var(--text-secondary)', padding: '0 var(--space-1)', textTransform: 'lowercase' }}>{caption}</div>
      <div style={{ position: 'relative', width: '320px', height: '680px', borderRadius: 'var(--radius-frame)', overflow: 'hidden', background: 'var(--bg)', boxShadow: '0 0 0 1.5px rgba(0,0,0,.22),0 30px 70px -36px rgba(0,0,0,.45)' }}>
        <div style={{ position: 'absolute', top: 'var(--space-5)', left: 'var(--screen-margin)', font: 'var(--text-mono-tag)', color: 'var(--text-primary)', zIndex: 'var(--z-header)' }}>9:41</div>
        <div className="account-scr" style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: 'var(--safe-top) var(--screen-gutter) var(--safe-bottom)', scrollbarWidth: 'none', ...screenStyle }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function AccountLab() {
  const P = (window.PG || {});
  if (!P.Section || !P.ListRow) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 320px)', gap: 'var(--space-7)', alignItems: 'start' }}>
      <Phone caption="1 · the grouped list">
        <GroupedList />
      </Phone>
      <Phone caption="2 · destructive set apart" screenStyle={{ display: 'flex', flexDirection: 'column' }}>
        <DestructiveSetApart />
      </Phone>
      <Phone caption="3 · minimal" screenStyle={{ display: 'flex', flexDirection: 'column' }}>
        <Minimal />
      </Phone>
    </div>
  );
}

if (typeof window !== 'undefined') window.PG = Object.assign(window.PG || {}, { AccountLab });
