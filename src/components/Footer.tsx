export default function Footer() {
  return (
    <footer className="border-t border-subtle py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-content-secondary text-sm">
        <span>
          Built with React, TypeScript, Framer Motion and lots of coffee ☕
        </span>
        <span>© {new Date().getFullYear()} · All rights reserved</span>
      </div>
    </footer>
  );
}
