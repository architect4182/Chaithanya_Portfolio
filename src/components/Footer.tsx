export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
        <span>
          Designed & built by{" "}
          <span className="text-white font-medium">Chaithanya Pedhagali</span>
        </span>
        <span>© {new Date().getFullYear()} · All rights reserved</span>
      </div>
    </footer>
  );
}
