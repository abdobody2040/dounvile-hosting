import { LoaderCircle, Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLocation } from "wouter";

export function DomainSearch({ large = false, initialValue = "" }: { large?: boolean; initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  const [tld, setTld] = useState(".com");
  const [pending, setPending] = useState(false);
  const [, setLocation] = useLocation();
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = value.trim().replace(/^https?:\/\//, "").replace(/\.[a-z]{2,12}$/i, "");
    setPending(true);
    setLocation(`/domains?name=${encodeURIComponent(query || "فكرتك")}&tld=${encodeURIComponent(tld)}`);
  };
  return (
    <form className={`domain-search ${large ? "domain-search-large" : ""}`} onSubmit={submit} data-pending={pending || undefined}>
      <div className="domain-input-wrap">
        <Search size={20} aria-hidden="true" />
        <label className="sr-only" htmlFor="domain-search">اسم النطاق</label>
        <input id="domain-search" value={value} onChange={(event) => { setPending(false); setValue(event.target.value); }} placeholder="ابحث عن اسمك الرقمي" autoComplete="off" />
      </div>
      <select aria-label="امتداد النطاق" value={tld} onChange={(event) => setTld(event.target.value)}>
        <option>.com</option>
        <option>.net</option>
        <option>.io</option>
        <option>.me</option>
      </select>
      <button type="submit" className="neon-button" disabled={pending}>{pending ? <><LoaderCircle className="search-loader" /> جارٍ الفحص</> : "ابحث الآن"}</button>
      <span className="sr-only" aria-live="polite">{pending ? "جارٍ تحويلك إلى نتائج البحث" : ""}</span>
    </form>
  );
}
