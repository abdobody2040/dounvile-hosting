const steps = ["اختر الخطة", "اختر النطاق", "الحساب", "المراجعة والدفع"];

export function CheckoutProgress({ currentStep }: { currentStep: 2 | 3 | 4 }) {
  const progress = ((currentStep - 1) / 3) * 100;
  return <div className="checkout-progress" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={currentStep} aria-valuetext={`المرحلة الحالية: ${steps[currentStep - 1]}`}>
    <div className="checkout-progress-track" aria-hidden="true"><i style={{ transform: `scaleX(${progress / 100})` }} /></div>
    {steps.map((label, index) => { const step = index + 1; const state = step < currentStep ? "done" : step === currentStep ? "active" : ""; return <span className={state} key={label}><i>{step}</i>{label}</span>; })}
    <p role="status">المرحلة الحالية: <b>{steps[currentStep - 1]}</b></p>
  </div>;
}
