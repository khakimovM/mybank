export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-orange-100 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
        <p>
          &copy; {year}{' '}
          <span className="font-semibold text-orange-600">mybank</span> — Valyuta
          kurslari xizmati
        </p>
        <p>O'zbekiston Respublikasi</p>
      </div>
    </footer>
  );
}
