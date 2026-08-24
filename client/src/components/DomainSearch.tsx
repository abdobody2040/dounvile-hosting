import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLocation } from "wouter";

export function DomainSearch({ large = false, initialValue = "" }: { large?: boolean; initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  const [, setLocation] = useLocation();
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = value.trim().replace(/^https?:\/\//, "").replace(/\.[a-z]{2,12}$/i, "");
    setLocation(`/domains?name=${encodeURIComponent(query || "فكرتك")}`);
  };
  return (
    <form className={`domain-search ${large ? "domain-search-large" : ""}`} onSubmit={submit}>
      <div className="domain-input-wrap">
        <Search size={20} aria-hidden="true" />
        <label className="sr-only" htmlFor="domain-search">اسم النطاق</label>
        <input id="domain-search" value={value} onChange={(event) => setValue(event.target.value)} placeholder="ابحث عن اسمك الرقمي" autoComplete="off" />
      </div>
      <select aria-label="امتداد النطاق" defaultValue=".com">
        <option>.com</option>
        <option>.net</option>
        <option>.io</option>
        <option>.me</option>
      </select>
      <button type="submit" className="neon-button">ابحث الآن</button>
    </form>
  );
}
