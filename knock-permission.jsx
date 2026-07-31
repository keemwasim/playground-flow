const KnockPermission = ({ variant = 'sheet' }) => {
  const { Sprite, Button, Bubble, Line } = window.PG;

  if (variant === 'bubble') {
    return (
      <div className="knock-screen knock-screen-bubble">
        <div className="knock-state">the knock</div>
        <div className="knock-bubble">
          <Bubble maxW={244}>
            <Line>I have something to bring home.</Line>
            <Line delay={260}>Let me knock when it arrives?</Line>
          </Bubble>
        </div>
        <div className="knock-companion knock-companion-bubble">
          <Sprite form="pebble" size={104} mood={48} />
        </div>
        <div className="knock-action knock-action-bubble">
          <Button full size="lg">let it reach me</Button>
        </div>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <div className="knock-screen knock-screen-button">
        <div className="knock-state">the knock</div>
        <div className="knock-companion knock-companion-button">
          <Sprite form="pebble" size={116} mood={32} />
        </div>
        <div className="knock-action knock-action-button">
          <Button full size="lg">let it reach me</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="knock-screen knock-screen-sheet">
      <div className="knock-state">the knock</div>
      <div className="knock-companion knock-companion-sheet">
        <Sprite form="pebble" size={112} mood={28} />
      </div>
      <div className="knock-sheet">
        <div className="knock-grabber" />
        <div className="knock-sheet-title">let it reach you</div>
        <div className="knock-sheet-copy">when something comes home, I’ll knock.</div>
        <Button full size="lg">let it reach me</Button>
      </div>
    </div>
  );
};

if (typeof window !== 'undefined') {
  window.PG = Object.assign(window.PG || {}, { KnockPermission });
}

if (typeof module !== 'undefined') module.exports = { KnockPermission };
