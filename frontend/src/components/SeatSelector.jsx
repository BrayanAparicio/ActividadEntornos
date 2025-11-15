const DEFAULT_ROWS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_COLS = 12;

const specialSeats = new Set(["C7", "C8"]);

export default function SeatSelector({
  rows = DEFAULT_ROWS,
  cols = DEFAULT_COLS,
  selectedSeats = [],
  disabledSeats = [],
  onToggle,
}) {
  const selectedSet = new Set(selectedSeats);
  const disabledSet = new Set(disabledSeats);

  const handleClick = (seatId) => {
    if (disabledSet.has(seatId)) {
      return;
    }
    onToggle(seatId);
  };

  return (
    <div className="seat-selector">
      <div className="screen">PANTALLA</div>
      <div className="seat-grid">
        {rows.map((row) => (
          <div key={row} className="seat-row">
            <span className="seat-label">{row}</span>
            <div className="seat-line">
              {Array.from({ length: cols }, (_, index) => {
                const seatNumber = index + 1;
                const seatId = `${row}${seatNumber}`;
                const isSelected = selectedSet.has(seatId);
                const isDisabled = disabledSet.has(seatId);
                const isSpecial = specialSeats.has(seatId);
                return (
                  <button
                    key={seatId}
                    type="button"
                    className={[
                      "seat",
                      isSelected && "selected",
                      isDisabled && "disabled",
                      isSpecial && "accessible",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleClick(seatId)}
                    disabled={isDisabled}
                  >
                    {seatId}
                  </button>
                );
              })}
            </div>
            <span className="seat-label">{row}</span>
          </div>
        ))}
      </div>
      <div className="seat-legend">
        <span className="seat sample" /> Disponible
        <span className="seat sample selected" /> Seleccionado
        <span className="seat sample accessible" /> Accesible
      </div>
    </div>
  );
}
