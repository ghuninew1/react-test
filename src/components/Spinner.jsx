// eslint-disable-next-line react/prop-types
export default function Spinner({ active = true }) {
  return (
    <>
      <div className={["spinner", active && "spinner--active"].join(" ")}
        role="progressbar"
        aria-busy={active ? "true" : "false"}
      />
    </>
  );
}
