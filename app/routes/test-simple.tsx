import { json } from "@remix-run/node";

export const loader = async () => {
  return json({ message: "Simple test route working!" });
};

export default function TestSimple() {
  return (
    <div>
      <h1>Simple Test Route</h1>
      <p>This route works without authentication.</p>
    </div>
  );
}